export type FetcherResponse<T> = {err: Error | null, res: T | null}

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

export interface FetcherInterface {
  get<T>(args: FetcherGetArgs<T>): Promise<FetcherResponse<T>>;
  post<T>(args: FetcherPostArgs<T>) : Promise<FetcherResponse<T>>;
}