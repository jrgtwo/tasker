import { useState, useEffect, type ReactNode } from 'react';
import { UserLoginContext } from "./UserLoginContext";
import type { GoogleLoginData, User } from './../../components/User/Types'
import { googleLoginInit, googleLogout, openGoogleLoginPrompt } from './../../vendor/google/google'
import { StorageSingleton } from '../../utils/storage';
import { LOGIN_STATES } from './constants';

function UserLoginProvider({ children }: { children: ReactNode}) {
  const [loginState, setLoginState] = useState<LOGIN_STATES>(LOGIN_STATES.INITIALIZE)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [googleLoginData, setGoogleLoginData] = useState<GoogleLoginData | null>(null)
  const [userLoginData, setUserLoginData] = useState<User | null>(null);

  useEffect(() => {
    window.Storetest = StorageSingleton
    StorageSingleton.onLogout(() => {
      setLoginState(LOGIN_STATES.LOGGED_OUT)
      setIsLoggedIn(false)
      setGoogleLoginData(null)
      setUserLoginData(null)
      googleLogout()
    })
  }, [])
  

  useEffect(() => {
    if (loginState === LOGIN_STATES.INITIALIZE) {
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
        const { err, res } = await StorageSingleton.login({googleLoginData})
        
        if (err || !res) {
          setLoginState(LOGIN_STATES.LOGGED_OUT)
        } else {
          setUserLoginData(res.loginData)
 
          setLoginState(LOGIN_STATES.LOGGED_IN)
        }
      })()
    }
  }, [loginState, googleLoginData])
   
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