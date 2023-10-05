import { Outlet, Navigate } from 'react-router-dom'

export const AuthRouter = () => {
  const authStatus = 'authenticated'

  return authStatus === 'authenticated' ? <Navigate to={'/'} /> : <Outlet />
}
