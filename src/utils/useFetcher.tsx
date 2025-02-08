import { useEffect, useContext, useState} from 'react';
import { FetcherContext } from './FetcherContext'
import { FetcherResponse } from './FetcherTypes';

enum FETCHER_STAGES {
  INIT,
  PRE,
  IN_PROGRESS,
  COMPLETED,
  SUCCESS,
  ERROR
}
type METHODS = {
  get: string, post:string
}
const Methods:METHODS = {
  get: 'get',
  post: 'post'
}

function useFetcher<T> ({endpoint, body, method = Methods.get}: {endpoint:string, body: {[key:string]: string}, method: typeof keyof METHODS}) {
  const fetcher  = useContext(FetcherContext);
  const [stage, setStage] = useState<FETCHER_STAGES>(FETCHER_STAGES.INIT)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    setStage(FETCHER_STAGES.PRE);
    if (endpoint && body && method)
    (async () => {
      setStage(FETCHER_STAGES.IN_PROGRESS)
      const request = {
        path: endpoint, 
        body
      }

      let response

      if (method === Methods.get) {
        response = await fetcher.get<T>(request) || {}
      } else {
        response = await fetcher.post<T>(request) || {}
      }
     
      const {err, res} = response
      if (err || !res || res === null) {
        setError(err || null)
      } else {
        setData(res)
      }
    
    })()
    
  }, [endpoint, body, fetcher, method])

  return {
    data, error, stage
  }
}

export { useFetcher }


/**
 * 
 * const { data, error, stage } = useFetcher({endpoint, body, method})
 */