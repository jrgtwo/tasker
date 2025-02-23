
import { decodeJwtResponse } from "./utils";

const googleLoginInit = () => {

  return new Promise((resolve) => {
    google?.accounts?.id.initialize({
      auto_select: true, 
      client_id: import.meta.env.VITE_GOOGLE_API_KEY,
      cancel_on_tap_outside: false,
      callback: async (response) => {
        const responsePayload = decodeJwtResponse(response.credential);
        resolve(responsePayload)
      }
    });
  })
}

const openGoogleLoginPrompt = () => {
  console.log('open-prompt')
  google?.accounts.id.prompt();
}

export { googleLoginInit, openGoogleLoginPrompt }