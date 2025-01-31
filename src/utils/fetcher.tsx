import type {
  FetcherResponse, 
  FetcherConstructorArgs, 
  FetcherGetArgs,
  FetcherPostArgs
} from "./FetcherTypes";

const defaultResponse = {err: null, res: null};

class Fetcher {
  #BASE_URL!: string

  constructor({ BASE_URL }: FetcherConstructorArgs) {
    if (!BASE_URL) throw new Error('No Base URL incldued');

    this.#BASE_URL = BASE_URL
  }

  async get<ResType>({ path, cb }: FetcherGetArgs<ResType>) {
      const output: FetcherResponse<ResType | null> = defaultResponse;
      try {
        const req = await fetch(this.#BASE_URL + path)
        const res = await req.json()
        output.res = res;
      } catch (err) {
        console.warn('Error Received: ', err);
        output.err = new Error(`Error: ${err}`)
      }

      cb(output)
  }

  async post<ResType>({path, cb, body}: FetcherPostArgs<ResType>) {
    const output: FetcherResponse<ResType | null> = defaultResponse;
    try {
      const reqBody = typeof body === 'string' ? body: JSON.stringify(body)
      const req = await fetch(this.#BASE_URL + path, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: reqBody
      });
      const res = await req.json()

      console.log(res)
      output.res = res
    } catch(err) {
      console.warn('Error Received: ', err);
      output.err = new Error(`Error: ${err}`)
    }
  
    cb(output);
  } 
}

export { Fetcher}