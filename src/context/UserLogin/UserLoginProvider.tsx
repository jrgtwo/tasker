import { useContext, useState, useEffect, type ReactNode } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
import { UserLoginContext } from "./UserLoginContext";
import { FetcherContext } from "../../utils/FetcherContext";
import type { User } from './../../components/User/Types'
import { googleLoginInit, openGoogleLoginPrompt } from './../../vendor/google/google'
import { FetcherResponse } from '../../utils/FetcherTypes';
import { toLoginRequestBody } from './utils'

function UserLoginProvider({ children }: { children: ReactNode}) {
  
  const fetcher = useContext(FetcherContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [googleLoginData, setGoogleLoginData] = useState<unknown | null>(null)
  const [userLoginData, setUserLoginData] = useState<User | null>(null);
  const [localUserId] = useState(sessionStorage.getItem('tasker::userId'))
  const [localUserData] = useState<string | null>(JSON.parse(sessionStorage.getItem('tasker::userData') || 'null'))

  useEffect(() => {
    googleLoginInit().then((googleLoginData) => {
      setGoogleLoginData(googleLoginData)
    })
  }, [localUserId])

  useEffect(() => {
    if (!localUserId) openGoogleLoginPrompt()
   }, [localUserId]);

   useEffect(() => {

    if (localUserId || googleLoginData) {

      const requestBody = toLoginRequestBody({localUserId, googleLoginData})

      fetcher.post<User>({
        path: ENDPOINTS.USER.LOGIN,
        body: requestBody
      }).then((data: FetcherResponse<User>)=> {
        const {err, res} = data
        if (err || !res) {
          //handle error
        } else {
          setUserLoginData(res)
          setIsLoggedIn(true)
          sessionStorage.setItem('tasker::userId', res.userId)
          sessionStorage.setItem('tasker::usreData', JSON.stringify(res))
        }
      });
    }

   }, [localUserId, googleLoginData, fetcher])
   
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