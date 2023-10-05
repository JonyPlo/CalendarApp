import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthRouter, authRoutes } from '../auth'
import { CalendarRouter, calendarRoutes } from '../calendar'

const router = createBrowserRouter([
  {
    path: 'auth/*',
    element: <AuthRouter />,
    children: authRoutes
  },
  {
    path: '/*',
    element: <CalendarRouter />,
    children: calendarRoutes
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
