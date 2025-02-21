import { useEffect, useState, useCallback } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
const Tester = () => {

  const [token, setToken] = useState('')
  const [isTokenExpired, setIsTokenExpired ] = useState(false)

  useEffect(() => {

    (async () => {
      try {
        const req = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_TOKEN, {
          method: 'POST',

          body: JSON.stringify({
            data: { "some": "data"}
          }),
          credentials: 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
          })
        });
        const res = await req.json()
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
          'Authorization': `Bearer ${token}`
        })
      })

      const res = await req.json()
      if (res?.err) {
        throw new Error('Token Expired')
      }
      console.log(res)
      // debugger 
    } catch (err) {

      console.log(err)
  
      if (err?.message === 'Token Expired') {
        setIsTokenExpired(true)
      }
    }
  }, [token])

  useEffect(() => {
    if (!isTokenExpired) return 

    (async () => {
      try {
        const req = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.USER.AUTH_TOKEN_REFRESH, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({
            data: { "some": "data"},
          }),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-type': 'application/json',
          })
        });
        const res = await req.json()
        setToken(res)
        setIsTokenExpired(false)
      } catch (err) {
        debugger
      }
    })()
  }, [isTokenExpired])

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