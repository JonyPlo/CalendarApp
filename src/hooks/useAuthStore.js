import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api'
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} from '../store/auth/authSlice'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  /**
   * Logs the user in and saves the response
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const startLogin = async (email, password) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      dispatch(onLogout('Incorrect credentials'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  /**
   * Registers a new user and saves the response
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const startRegister = async (name, email, password) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password
      })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      console.log(error.response.data)
      dispatch(onLogout(error.response.data?.msg || 'An error has ocurred'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  useEffect(() => {
    if (errorMessage) {
      Swal.fire('Authentication error!', `${errorMessage}`, 'error')
    }
  }, [errorMessage])

  return {
    //* Properties
    status,
    user,
    errorMessage,

    //* Methods
    startLogin,
    startRegister
  }
}
