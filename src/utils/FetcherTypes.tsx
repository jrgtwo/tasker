export type FetcherResponse<T> = {err: Error | null, res: T | null}

export type FetcherConstructorArgs = {
  BASE_URL: string
}

export type FetcherGetArgs<T> = {
  pageToFetch: string
  cb: (responseData: FetcherResponse<T | null>) => void
}


