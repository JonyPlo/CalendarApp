import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const AuthRouter = () => {
  const authStatus = 'authenticated';

  return authStatus === 'authenticated' ? <Navigate to={'/'} /> : <Outlet />;
};
