import { GoogleLoginData } from './../../components/User/Types'

const toLoginRequestBody = ({
  googleLoginData
}: {
  googleLoginData: GoogleLoginData | null
}) => ({
  userId: googleLoginData?.sub,
  fname: googleLoginData?.given_name,
  lname: googleLoginData?.family_name,
  email: googleLoginData?.email,
  picture: googleLoginData?.picture
})

export { toLoginRequestBody }