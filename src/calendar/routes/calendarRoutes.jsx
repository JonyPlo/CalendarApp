import { Navigate } from 'react-router-dom'
import { CalendarPage } from '..'

export const calendarRoutes = [
  {
    path: '*',
    element: <CalendarPage />
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
]
