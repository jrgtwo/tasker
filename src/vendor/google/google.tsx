import { useState, useEffect , createContext, useContext, ReactNode} from 'react';
import { decodeJwtResponse } from "./utils";
import { FetcherContext } from '../../utils/FetcherContext';
import { ENDPOINTS } from '../../constants/endpoints';
import type { User } from './../../components/User/Types'

const UserLoginContext = createContext<{
  isLoggedIn: boolean,
  userLoginData: User | null,
  notifications: unknown[]
}>({
  isLoggedIn: false, userLoginData: null, notifications: []
})

function UserLoginProvider({ children }: { children: ReactNode}) {

  const fetcher = useContext(FetcherContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userLoginData, setUserLoginData] = useState<User>();
  const [notifications, setNotifications] = useState<unknown[]>([])
  const [localUserId] = useState(sessionStorage.getItem('taskesr::userId'))
   useEffect(() => {
    
    google?.accounts?.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_KEY,
      auto_select: true,
      login_hint: userLoginData?.userId || localUserId || undefined,
      cancel_on_tap_outside: false,
      callback: async (response) => {
        const responsePayload = decodeJwtResponse(response.credential);
  
        const {err, res} = await fetcher.post<User>({
          path: ENDPOINTS.USER.LOGIN,
          body: {
            userId: responsePayload.sub,
            fname: responsePayload.given_name,
            lname: responsePayload.family_name,
            email: responsePayload.email,
            picture: responsePayload.picture
          }
        });

        if (err || !res) {
          console.warn(err);

        } else {
          setIsLoggedIn(true);
          setUserLoginData(res);
          sessionStorage.setItem('taskser::userId', responsePayload.userId)
        }
      }
    });
    // google.accounts.id.storeCredential
    google?.accounts.id.prompt((notification) => {
      console.log('!===notification', notification)
      setNotifications((prevNotifications) => ([
        ...prevNotifications, 
        notification
      ]));

      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // try next provider if OneTap is not displayed or skipped
        }
    });
   }, [fetcher]);
   
   
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