import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCkeching: state => {
      state.status = 'checking'
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    }
  }
})

export const { onCkeching, onLogin } = authSlice.actions
