import { createContext } from 'react'
import type { User } from '../../components/User/Types';

const UserLoginContext = createContext<{
  isLoggedIn: boolean,
  userLoginData: User | null
}>({
  isLoggedIn: false, 
  userLoginData: null
});

export { UserLoginContext }