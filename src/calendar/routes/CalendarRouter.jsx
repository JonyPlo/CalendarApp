import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const CalendarRouter = () => {
  const authStatus = 'not-authenticated';

  return authStatus === 'not-authenticated' ? (
    <Navigate to={'auth/login'} />
  ) : (
    <Outlet />
  );
};
