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
  errorCB

  constructor({ BASE_URL, errorCB }: FetcherConstructorArgs) {
    if (!BASE_URL) throw new Error('No Base URL incldued');
    if (errorCB && typeof errorCB === 'function') {
      this.errorCB = errorCB
    }
    this.#BASE_URL = BASE_URL
  }

  async checkRefreshAndRetry({path, options}) {
    const refreshed = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_TOKEN_REFRESH, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-type': 'application/json',
      })
    })
    
    const refreshedRes = await refreshed.json()

    if (!refreshedRes.accessToken) return {err: true, message: 'Refresh Token Failure'}

    this.accessToken = refreshedRes.accessToken

    return this.runFetch({path, options})
  }

  setAccessToken(accessToken:string) {
    this.accessToken = accessToken
  }

  async handleFetchErrors({path, options, err}) {
    if (err.message === 'No token provided') {
      return {err: true, message: 'LOGOUT'}
    } else if (err.message === 'Token Expired') {
      return await this.checkRefreshAndRetry({path, options});        
    }
  }

  handleFatalFetchErrors(err) {
    console.log(err)
    return {err: true, message: err}
  }

  async tryFetch(path, options) {
    try {
      const req = await fetch(path, options)
      const res = await req.json()

      if (res.accessToken) this.setAccessToken(res.accessToken)

      if (res.err) {
        return await this.handleFetchErrors({path, options, err: res})
      }

      return res
    } catch(error) {
      return this.handleFatalFetchErrors({ err: error})
    }

  } 

  async runFetch<ResType>({
    path, options = {}
  }: {
    path: string, 
    options?: {[key:string]: unknown}
  }):Promise<FetcherResponse<ResType>> {

      if (this.accessToken) {
        options.headers.set('Authorization', `bearer ${this.accessToken}`)
      }

      const fetchData = await this.tryFetch(path, options)

      if (fetchData?.err) {
        this?.errorCB(fetchData?.err)
        return {err: 'some error', res: null}
      }
 
      return {res: fetchData, err: null}
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