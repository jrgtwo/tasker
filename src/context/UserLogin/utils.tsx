import { GoogleLoginData } from './../../components/User/Types'

const toLoginRequestBody = ({
  localUserId, 
  googleLoginData
}: {
  localUserId: string | null,
  googleLoginData: GoogleLoginData | null
}) => (
  googleLoginData ? {
    userId: googleLoginData?.sub,
    fname: googleLoginData?.given_name,
    lname: googleLoginData?.family_name,
    email: googleLoginData?.email,
    picture: googleLoginData?.picture
  }
  : { userId: localUserId}
)

export { toLoginRequestBody }