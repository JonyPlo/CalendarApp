import { Navigate } from 'react-router-dom';

export const authRoutes = [
  {
    path: '*',
    element: <Navigate to={'login'} />,
  },
];
