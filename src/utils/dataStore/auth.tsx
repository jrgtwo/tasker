import type { Fetcher } from "../fetcher/fetcher";
import type { User } from "../../components/User/Types";
import type { GoogleLoginData } from "../../components/User/Types";
import { toLoginRequestBody } from "../../context/UserLogin/utils"
import { ENDPOINTS } from "../../constants/endpoints";

class AuthApi {
  #fetcher

  constructor({ fetcher}: {fetcher: Fetcher}) {
    this.#fetcher = fetcher;
  }
  async login({ 
    googleLoginData
  }: {
    googleLoginData: GoogleLoginData | null
  }) {
    const {err, res} = await this.#fetcher.post<User>({
      path: ENDPOINTS.USER.LOGIN,
      body: toLoginRequestBody({googleLoginData}),
      withCredentials: true
    })

    return {err, res}
  }

  async refreshLogin() {
    const {err, res} = await this.#fetcher.checkRefresh()

    return {err, res: res?.loginData}
  }
}

export { AuthApi }