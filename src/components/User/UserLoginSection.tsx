//import { useGoogleLogin } from "../../vendor/google/google";
import { useContext } from 'react'
import { UserLoginContext, UserLoginProvider } from "../../vendor/google/google"

const OtherComponent = () => {
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
const UserLoginSection = () => {

  return (
    <>
      <UserLoginProvider>
          <OtherComponent />
      </UserLoginProvider>
    </>
  )
}

export { UserLoginSection }