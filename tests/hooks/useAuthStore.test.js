import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../src/store'
import { initialState, notAuthenticatedState } from '../fixtures/authStates'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { Provider } from 'react-redux'
import { testUserCredentials } from '../fixtures/testUser'
import { calendarApi } from '../../src/api'

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
  beforeEach(() => localStorage.clear())

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
    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const incorrectEmail = 'incorrectEmail@gmail.com'
    const incorrectPassword = '12345asd'

    await act(async () => {
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

  test('startRegister should create an user', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    // Aqui creamos lo que se llama un "espía" que retornara la respuesta cuando el calendarApi se dispare para hacer un POST, esta seria una forma de escuchar alguna peticion post y hacer un return custom con el metodo mockReturnValue
    //Hacemos esto para evitar que se registre el Test User en la base de datos real
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: 'any-id',
        name: 'Test User2',
        token: 'any-token',
      },
    })

    const name = 'Test User2'
    const email = 'test2@gmail.com'
    const password = 'asd12345'

    await act(async () => {
      await result.current.startRegister(name, email, password)
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User2', _id: 'any-id' },
    })

    // Esto hace que destruyamos el "espía" por si acaso en otra prueba necesitamos hacer algún POST con el calendarApi y llegar al backend si es necesario, si no lo hacemos posteriores pruebas dispararan ese espía
    spy.mockRestore()
  })

  test('startRegister should fail to create user', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const { name, email, password } = testUserCredentials

    await act(async () => {
      await result.current.startRegister(name, email, password)
    })

    const { errorMessage, status, user } = result.current

    console.log(result.current)

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'User already exists',
      status: 'not-authenticated',
      user: {},
    })
  })
})
