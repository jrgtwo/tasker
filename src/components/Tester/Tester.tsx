import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants/endpoints';
const Tester = () => {
  const [res, setRes] = useState(null)
  const [err, setErr] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(ENDPOINTS.USER.AUTH, {
          method: 'POST',
          body: JSON.stringify({
            data: { "some": "data"},
            headers: new Headers({
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            })
          })
        });
        const res = await req.json()
        //setRes(res)
        debugger
      } catch (err) {
        debugger
      }
      
    })()
    
  }, []) 

  return (
    <>
      <h4>Testing requests, check console for test output</h4>
    </>
  )
}

export { Tester }