import { useAuthStore } from '../../hooks'

export const RegisterButton = ({ authLoader }) => {
  const { status } = useAuthStore()

  const authChecking = status === 'checking' && authLoader === 'register'

  return (
    <div className='d-grid gap-2 mt-3'>
      <button type='submit' className='btnSubmit' disabled={authChecking}>
        {authChecking && (
          <span className='spinner-border spinner-border-sm me-2' />
        )}
        <span>Register</span>
      </button>
    </div>
  )
}
