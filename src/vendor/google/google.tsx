import { useState, useEffect , createContext} from 'react';
import { decodeJwtResponse } from "./utils";

const UserLoginContext = createContext<{
  isLoggedIn: boolean,
  userLoginData: null | unknown,
  notifications: unknown[]
}>({
  isLoggedIn: false, userLoginData: null, notifications: []
})

function UserLoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userLoginData, setUserLoginData] = useState({});
  const [notifications, setNotifications] = useState<unknown[]>([])

   useEffect(() => {
    google?.accounts?.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_KEY,
      callback: (response) => {
        const responsePayload = decodeJwtResponse(response.credential);
        setIsLoggedIn(true);
        setUserLoginData(responsePayload);
      }
    });

    google?.accounts.id.prompt((notification) => {
      console.log('===notification', notification)
      setNotifications((prevNotifications) => ([
        ...prevNotifications, 
        notification
      ]));

      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // try next provider if OneTap is not displayed or skipped
        }
    });
   }, []);
   
   
  return (
    <UserLoginContext.Provider value={{
      isLoggedIn, 
      userLoginData, 
      notifications
    }}>
      {children}
    </UserLoginContext.Provider>
  )
}

export { UserLoginContext, UserLoginProvider }