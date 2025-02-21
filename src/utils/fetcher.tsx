import type {
  FetcherResponse, 
  FetcherConstructorArgs, 
  FetcherGetArgs,
  FetcherPostArgs
} from "./FetcherTypes";

class Fetcher {
  #BASE_URL!: string

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
      const req = await fetch(path, options)
      const res = await req.json()
      return {res, err: null}
    } catch(err){
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
          headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
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