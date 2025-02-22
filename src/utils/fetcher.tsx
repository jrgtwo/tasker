import { ENDPOINTS } from "../constants/endpoints";
import type {
  FetcherResponse, 
  FetcherConstructorArgs, 
  FetcherGetArgs,
  FetcherPostArgs
} from "./FetcherTypes";

class Fetcher {
  #BASE_URL!: string
  accessToken: string | null = null

  constructor({ BASE_URL }: FetcherConstructorArgs) {
    if (!BASE_URL) throw new Error('No Base URL incldued');

    this.#BASE_URL = BASE_URL
  }

  async runFetch<ResType>({
    path, options = {}
  }: {
    path: string, 
    options?: {[key:string]: unknown}
  }):Promise<FetcherResponse<ResType>> {
    try{
      if (this.accessToken) {
        options.headers.append('Authorization', `bearer ${this.accessToken}`)
      }

      const req = await fetch(path, options)
      const res = await req.json()
      if (res?.err) throw new Error(res.message)
      if (res.accessToken) this.accessToken = res.accessToken
      return {res, err: null}
    } catch(err){
      if (err.message === 'No token provided') {
        debugger
      } else if (err.message === 'Token Expired') {
        const refreshed = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_TOKEN_REFRESH, {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
          })
        })

        const refreshedRes = await refreshed.json()

        if (refreshedRes.accessToken) this.accessToken = refreshedRes.accessToken
        // this is working, just need a better approach
        // once refresh is cleaned up, clean up stored user values
        debugger

      }
      
      return {err: new Error(`error ${err}`), res: null}
    }
  }

  async get<ResType>({
     path, cb 
    }: FetcherGetArgs<ResType>
  ): Promise<FetcherResponse<ResType>> {
 
    const output = await this.runFetch<ResType>({ path })

    if (typeof cb === 'function') cb(output)

    return output
  }


  async post<ResType>({path, cb, body, withCredentials}: FetcherPostArgs<ResType>) {
    const reqBody = typeof body === 'string' ? body: JSON.stringify(body)

    const opts = {
      path: this.#BASE_URL + path, 
      options: {
          method: 'POST',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }),
          body: reqBody
      }}

    if (withCredentials) {
      opts.options.credentials = 'include';
    }

    const output = await this.runFetch<ResType>(opts)
    
    if (typeof cb === 'function') cb(output)

    return output
  }
}

export { Fetcher}