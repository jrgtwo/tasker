import { useState, useEffect, type ReactNode } from 'react';
import { UserLoginContext } from "./UserLoginContext";
import type { GoogleLoginData, User } from './../../components/User/Types'
import { googleLoginInit, googleLogout, openGoogleLoginPrompt } from './../../vendor/google/google'
import { DataStoreSingleton } from '../../utils/dataStore/dataStore';
import { LOGIN_STATES } from './constants';

function UserLoginProvider({ children }: { children: ReactNode}) {
  const [loginState, setLoginState] = useState<LOGIN_STATES>(LOGIN_STATES.INITIALIZE)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [googleLoginData, setGoogleLoginData] = useState<GoogleLoginData | null>(null)
  const [userLoginData, setUserLoginData] = useState<User | null>(null);


  useEffect(() => {
    DataStoreSingleton.on('LOGOUT', () => {
      setLoginState(LOGIN_STATES.LOGGED_OUT)
      setIsLoggedIn(false)
      setGoogleLoginData(null)
      setUserLoginData(null)
      googleLogout()
    })
  }, [])

  useEffect(() => {
    if (loginState === LOGIN_STATES.INITIALIZE) {

      const possibleLocalUser = localStorage.getItem('userState')
      if (!possibleLocalUser) {

        setLoginState(LOGIN_STATES.GOOGLE_OPEN_PROMPT)
        return
      }

      let parsedPossibleLocalUser: {userId: string, expiry: string} | null;

      try {
        parsedPossibleLocalUser = JSON.parse(possibleLocalUser)
      } catch(err) {
        setLoginState(LOGIN_STATES.GOOGLE_OPEN_PROMPT)
        return
      }

      if (
        parsedPossibleLocalUser?.expiry && 
        new Date(parsedPossibleLocalUser?.expiry) < new Date()
      ) {
        setLoginState(LOGIN_STATES.GOOGLE_OPEN_PROMPT)
      } {
        setLoginState(LOGIN_STATES.CHECK_CAN_LOGIN)
      }
    }
  }, [loginState])


  useEffect(() => {
    if (loginState === LOGIN_STATES.CHECK_CAN_LOGIN) {
      // try to hit the refresh endpoint to login
      (async() => {
        const {err, res} = await DataStoreSingleton.refreshLogin()
        if (err) {
          setLoginState(LOGIN_STATES.GOOGLE_OPEN_PROMPT)
          return
        }

        setUserLoginData(res)
 
        setLoginState(LOGIN_STATES.LOGGED_IN)

        const expiry = Date.now() +  1000 * 60 * 60 * 24 * 7
        localStorage.setItem('userState', JSON.stringify({
          userId: res.userId,
          expiry
        }))

      })()
    }
  }, [loginState])

  useEffect(() => {
    if (loginState === LOGIN_STATES.GOOGLE_OPEN_PROMPT) {
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
        const { err, res } = await DataStoreSingleton.login({googleLoginData})

        if (err || !res) {
          setLoginState(LOGIN_STATES.LOGGED_OUT)
        } else {
          setUserLoginData(res.loginData)

          setLoginState(LOGIN_STATES.LOGGED_IN)
          const expiry = Date.now() +  1000 * 60 * 60 * 24 * 7
          localStorage.setItem('userState', JSON.stringify({
            expiry
          }))
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