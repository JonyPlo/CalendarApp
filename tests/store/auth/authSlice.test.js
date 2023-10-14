import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice'
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authStates'
import { testUserCredentials } from '../../fixtures/testUser'

describe('Testing in authSlice', () => {
  test('should return the initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('should perform a login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    })
  })

  test('should perform a logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    })
  })

  test('should perform a logout', () => {
    const errorMessage = 'Credentials error'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    expect(state).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: errorMessage,
    })
  })

  test('should clear error message state', () => {
    const errorMessage = 'Credentials error'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
    const newState = authSlice.reducer(state, clearErrorMessage())

    expect(newState.errorMessage).toBe(undefined)
  })

  test('should change status to checking', () => {
    const state = authSlice.reducer(notAuthenticatedState, onChecking())

    expect(state).toEqual(initialState)
  })
})
