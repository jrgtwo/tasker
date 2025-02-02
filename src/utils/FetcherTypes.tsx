export type FetcherResponse<T> = {err: Error | null, res: T | null}

export type FetcherConstructorArgs = {
  BASE_URL: string
}

export type FetcherGetArgs<T> = {
  path: string
  cb: (responseData: FetcherResponse<T | null>) => void
}

export type FetcherPostArgs<T> = {
  path: string
  cb: (responseData: FetcherResponse<T | null>) => void
  body: {[key:string]: unknown} | string
  headers?: {[key:string]: string}
}

export interface FetcherInterface {
  get<T>(args: FetcherGetArgs<T>): void;
  post<T>(args: FetcherPostArgs<T>) :void;
}