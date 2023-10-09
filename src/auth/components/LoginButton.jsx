import { useRef } from 'react'
import { useAuthStore } from '../../hooks'

export const LoginButton = ({ authLoader }) => {
  const { status } = useAuthStore()
  const loginRef = useRef()

  const authChecking = status === 'checking' && authLoader === 'login'

  return (
    <div className='d-grid gap-2 mt-3'>
      <button type='submit' className='btnSubmit' disabled={authChecking}>
        {authChecking && (
          <span className='spinner-border spinner-border-sm me-2' />
        )}
        <span ref={loginRef}>Login</span>
      </button>
    </div>
  )
}
