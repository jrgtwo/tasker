import { useContext } from 'react'
import { UserLoginContext } from '../../context/UserLogin/UserLoginContext'

const LoggedOut = () => {
  return (
    <>
      <h3>You are logged Out!</h3>
    </>
  )
}

const LoggedIn = () => {
  const { userLoginData } = useContext(UserLoginContext)
  return (
  <>
    <div>
      <img 
        src={`${userLoginData?.picture}`} 
        className="rounded-full w-12 outline-1 outline-amber-200"/>
    </div>
    </>
  )
}

const OtherComponent = () => {
  const { isLoggedIn } = useContext(UserLoginContext)

  return (
    <div className="absolute right-5 top-6">{
      isLoggedIn
        ? <LoggedIn />
        : <LoggedOut />
    }</div>
  )
}
const UserLoginSection = () => {

  return (
    <>
          <OtherComponent />
    </>
  )
}

export { UserLoginSection }