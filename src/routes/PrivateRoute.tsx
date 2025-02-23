import { Navigate, Outlet } from 'react-router'
const PrivateRoutes = ({
  isLoggedIn
}: {
  isLoggedIn: boolean
}) => (
  isLoggedIn 
    ? <Outlet/> 
    : <Navigate to='/'/>
  )

export { PrivateRoutes }