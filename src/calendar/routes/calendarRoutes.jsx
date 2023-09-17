import { Navigate } from 'react-router-dom';

export const calendarRoutes = [
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
];
