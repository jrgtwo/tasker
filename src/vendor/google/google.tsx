
import { decodeJwtResponse } from "./utils";

const googleLoginInit = ({
  config
}: {
  config: {apiKey: string, userId: string | undefined}
}) => {
  return new Promise((resolve) => {
    google?.accounts?.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_API_KEY,
//
 //     login_hint: config.userId,
      cancel_on_tap_outside: false,
      callback: async (response) => {
        const responsePayload = decodeJwtResponse(response.credential);
  
        resolve(responsePayload)
      }
    });
  })
}






  // google?.accounts?.id.initialize({
  //   client_id: config.apiKey, // import.meta.env.VITE_GOOGLE_API_KEY,
  //   auto_select: true,
  //   login_hint: config.userId,// userLoginData?.userId || localUserId || undefined,
  //   cancel_on_tap_outside: false,
  //   callback: async (response) => {
  //     const responsePayload = decodeJwtResponse(response.credential);
      
      // const {err, res} = await fetcher.post<User>({
      //   path: ENDPOINTS.USER.LOGIN,
      //   body: {
      //     userId: responsePayload.sub,
      //     fname: responsePayload.given_name,
      //     lname: responsePayload.family_name,
      //     email: responsePayload.email,
      //     picture: responsePayload.picture
      //   }
      // });

      // if (err || !res) {
      //   console.warn(err);

      // } else {
      //   setIsLoggedIn(true);
      //   setUserLoginData(res);
      //   sessionStorage.setItem('tasker::userId', responsePayload.userId)
      // }
    //}
 // });
//}

export { googleLoginInit }