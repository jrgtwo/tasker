export type FetcherResponse<T> = {err: Error | string| null, res: T | null}

export type FetcherConstructorArgs = {
  BASE_URL: string
}

export type FetcherGetArgs<T> = {
  path: string
  cb?: (responseData: FetcherResponse<T | null>) => void
}

export type FetcherPostArgs<T> = {
  path: string
  cb?: (responseData: FetcherResponse<T>) => unknown
  body: {[key:string]: unknown} | string
  headers?: {[key:string]: string}
}