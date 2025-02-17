import { useState, useEffect, type ReactNode } from 'react';
import { UserLoginContext } from "./UserLoginContext";
import type { GoogleLoginData, User } from './../../components/User/Types'
import { googleLoginInit, openGoogleLoginPrompt } from './../../vendor/google/google'
import { StorageSingleton } from '../../utils/storage';
import { LOGIN_STATES } from './constants';

const expirationDate = () => new Date(
  Date.now() + (7 * (24 * 60 * 60 * 1000))
).toDateString()

function UserLoginProvider({ children }: { children: ReactNode}) {

  const [loginState, setLoginState] = useState<LOGIN_STATES>(LOGIN_STATES.INITIALIZE)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [googleLoginData, setGoogleLoginData] = useState<GoogleLoginData | null>(null)
  const [userLoginData, setUserLoginData] = useState<User | null>(null);
  const [localUserId] = useState<{value: string, expiry: string} | null>(JSON.parse(sessionStorage.getItem('tasker::userId') || 'null'))
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
        if (googleLoginData) setGoogleLoginData(googleLoginData)
        setLoginState(LOGIN_STATES.GOOGLE_SIGNED_IN)
      })
      openGoogleLoginPrompt()
    }
  }, [loginState])

  useEffect(() => {
    if (loginState === LOGIN_STATES.GOOGLE_SIGNED_IN) {

      (async () => {
        const { err, res } = await StorageSingleton.login({localUserId, googleLoginData })

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
      })()
    }
  }, [loginState, localUserId, googleLoginData])
   
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