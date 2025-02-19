import { useEffect, useState, useCallback } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
const Tester = () => {

  const [token, setToken] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_TOKEN, {
          method: 'POST',
          body: JSON.stringify({
            data: { "some": "data"},
            headers: new Headers({
              'Accept': 'application/json',
              'Content-type': 'application/json',
            })
          })
        });
        const res = await req.json()
        debugger
        setToken(res)
      } catch (err) {
        debugger
      }
    })()
  }, []) 

  const makeTokenizedResponse = useCallback(async() => {
    try {
      
      const req = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_VERIFY, {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'authorization': `Bearer ${token}`
        })
      })

      const res = await req.json()
      console.log(res)
      debugger 
    } catch (err) {
      debugger
      // TODO, deal with refresh logic once token expires
      // if request fails, make a request to refresh endpoint
      // and resave token
      console.log(err)
    }
  }, [token])

  return (
    <>
      <h4>Testing requests, check console for test output {token}</h4>
      {token && 
      <button
        onClick={makeTokenizedResponse}>
        Check Token Requst
      </button>
      }
    </>
  )
}

export { Tester }