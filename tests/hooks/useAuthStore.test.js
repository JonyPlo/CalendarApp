import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../src/store'
import { initialState, notAuthenticatedState } from '../fixtures/authStates'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { Provider } from 'react-redux'
import { testUserCredentials } from '../fixtures/testUser'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  })
}

describe('Testing in useAuthStore', () => {
  test('should return the default state', () => {
    const mockStore = getMockStore({ ...initialState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    })
  })

  test('startLogin should log user in correctly', async () => {
    localStorage.clear()

    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const { email, password } = testUserCredentials

    await act(async () => {
      await result.current.startLogin(email, password)
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', _id: '6528259c5f7e338b125ac014' },
    })

    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })

  test('startLogin should fail to authenticate', async () => {
    localStorage.clear()

    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    await act(async () => {
      const incorrectEmail = 'incorrectEmail@gmail.com'
      const incorrectPassword = '12345asd'

      await result.current.startLogin(incorrectEmail, incorrectPassword)
    })

    const { errorMessage, status, user } = result.current

    expect(localStorage.getItem('token')).toBe(null)
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Incorrect credentials',
      status: 'not-authenticated',
      user: {},
    })

    await waitFor(() => {
      expect(result.current.errorMessage).toBe(undefined)
    })
  })
})
