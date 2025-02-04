const toLoginRequestBody = ({localUserId, googleLoginData}) => (
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