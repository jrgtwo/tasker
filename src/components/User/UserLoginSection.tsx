//import { useGoogleLogin } from "../../vendor/google/google";
import { useContext } from 'react'
import { UserLoginContext } from "../../vendor/google/google"

const LoggedOut = () => {
  return (
    <>
      <h3>You are logged Out!</h3>
    </>
  )
}

const LoggedIn = () => {
  const { isLoggedIn, userLoginData, notifications } = useContext(UserLoginContext)
  return (
  <>
    <div>
      <h4>Login section</h4>
      <p>Is Logged In: {`${isLoggedIn}`}</p>
      {isLoggedIn && (
        <img src={`${userLoginData.picture}`} />
      )}
      <ul>{
        notifications.map((item) => (
          <li>{JSON.stringify(item)}</li>
        ))
      }</ul>
      <p>{JSON.stringify(userLoginData)}</p>
    </div>
    </>
  )
}

const OtherComponent = () => {
  const { isLoggedIn } = useContext(UserLoginContext)

  return (
    <>{
      isLoggedIn
        ? <LoggedIn />
        : <LoggedOut />
    }</>
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