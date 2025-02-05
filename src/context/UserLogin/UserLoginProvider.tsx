import { useContext, useState, useEffect, type ReactNode } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import { UserLoginContext } from "./UserLoginContext";
import { FetcherContext } from "../../utils/FetcherContext";
import type { User } from './../../components/User/Types'
import { googleLoginInit, openGoogleLoginPrompt } from './../../vendor/google/google'
import { FetcherResponse } from '../../utils/FetcherTypes';
import { toLoginRequestBody } from './utils'

enum LOGIN_STATES {
  INITIALIZE,
  LOCAL_CHECKED,
  GOOGLE_SIGNED_IN,
  LOGGED_IN,
  LOGGED_OUT
}
const expirationDate = () => new Date(
  Date.now() + (7 * (24 * 60 * 60 * 1000))
).toDateString()

function UserLoginProvider({ children }: { children: ReactNode}) {
  
  const fetcher = useContext(FetcherContext)
  const [loginState, setLoginState] = useState<LOGIN_STATES>(LOGIN_STATES.INITIALIZE)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [googleLoginData, setGoogleLoginData] = useState<unknown | null>(null)
  const [userLoginData, setUserLoginData] = useState<User | null>(null);
  const [localUserId] = useState<{res: boolean, expiry: string} | null>(JSON.parse(sessionStorage.getItem('tasker::userId') || 'null'))
  const [localUserData] = useState<{res: User, expiry: string} | null>(JSON.parse(sessionStorage.getItem('tasker::userData') || 'null'))

  useEffect(() => {
    if ([LOGIN_STATES.INITIALIZE, LOGIN_STATES.LOGGED_OUT].includes(loginState)) {
      const isIdValid = localUserId?.expiry && new Date(localUserId?.expiry) > new Date()
      const isUserDataValid = localUserData?.expiry && new Date(localUserData?.expiry) > new Date()

      if (isIdValid && isUserDataValid) {        
          setUserLoginData(localUserData.res)
          setLoginState(LOGIN_STATES.LOGGED_IN);
      } else {
        setLoginState(LOGIN_STATES.LOCAL_CHECKED)
      }
    }
  }, [loginState, localUserData, localUserId])
  

  useEffect(() => {
    if (loginState === LOGIN_STATES.LOCAL_CHECKED) {
      googleLoginInit().then((googleLoginData) => {
        setGoogleLoginData(googleLoginData)
        setLoginState(LOGIN_STATES.GOOGLE_SIGNED_IN)
      })
      openGoogleLoginPrompt()
    }
  }, [loginState])

  useEffect(() => {
    if (loginState === LOGIN_STATES.GOOGLE_SIGNED_IN) {
      const requestBody = toLoginRequestBody({localUserId, googleLoginData})

      fetcher.post<User>({
        path: ENDPOINTS.USER.LOGIN,
        body: requestBody
      }).then((data: FetcherResponse<User>)=> {
        const {err, res} = data
        const expiry = expirationDate()
        if (err || !res) {
          setLoginState(LOGIN_STATES.LOGGED_OUT)
        } else {
          setUserLoginData(res)
          
          sessionStorage.setItem(
            'tasker::userId', 
            JSON.stringify({
              value: res.userId, 
              expiry
            })
          )
          sessionStorage.setItem(
            'tasker::userData', 
            JSON.stringify({res, expiry})
          )
          setLoginState(LOGIN_STATES.LOGGED_IN)
        }
      });
    }
  }, [loginState, localUserId, googleLoginData, fetcher])
   
  useEffect(() => {
    if (loginState === LOGIN_STATES.LOGGED_IN) setIsLoggedIn(true)
  }, [loginState])

  return (
    <UserLoginContext.Provider value={{
      isLoggedIn, 
      userLoginData
    }}>
      {children}
    </UserLoginContext.Provider>
  )
}

export { UserLoginProvider }