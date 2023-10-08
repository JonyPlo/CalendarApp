import { Outlet, Navigate } from 'react-router-dom'

export const AuthRouter = () => {
  const authStatus = 'checking'

  return authStatus === 'authenticated' ? <Navigate to={'/'} /> : <Outlet />
}
