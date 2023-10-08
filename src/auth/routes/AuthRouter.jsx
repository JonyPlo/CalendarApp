import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '../../hooks'
import { useEffect } from 'react'

export const AuthRouter = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }

  return status === 'authenticated' ? <Navigate to={'/'} /> : <Outlet />
}
