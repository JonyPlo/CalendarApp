import { Outlet, Navigate } from 'react-router-dom'

export const CalendarRouter = () => {
  const authStatus = 'authenticated'

  return authStatus === 'not-authenticated'
    ? (
    <Navigate to={'auth/login'} />
      )
    : (
    <Outlet />
      )
}
