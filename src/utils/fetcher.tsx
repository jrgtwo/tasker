import type {
  FetcherResponse, 
  FetcherConstructorArgs, 
  FetcherGetArgs 
} from "./FetcherTypes";

const defaultResponse = {err: null, res: null};

class Fetcher {
  #BASE_URL!: string

  constructor({ BASE_URL }: FetcherConstructorArgs) {
    if (!BASE_URL) throw new Error('No Base URL incldued');

    this.#BASE_URL = BASE_URL
  }

  async get<ResType>({ pageToFetch, cb }: FetcherGetArgs<ResType>) {
      const output: FetcherResponse<ResType | null> = defaultResponse;
      try {
        const req = await fetch(this.#BASE_URL + pageToFetch)
        const res = await req.json()
        output.res = res;
      } catch (err) {
        console.warn('Error Received: ', err);
        output.err = new Error(`Error: ${err}`)
      }

      cb(output)
  }

  post() {

  }
}

export { Fetcher}