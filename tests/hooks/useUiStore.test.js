import { renderHook } from '@testing-library/react'
import { useUiStore } from '../../src/hooks/useUiStore'
import { Provider } from 'react-redux'
import { uiSlice } from '../../src/store'
import { configureStore } from '@reduxjs/toolkit'
import { act } from '@testing-library/react'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    // preloadedState es para indicar como quiero que este el state en este punto
    preloadedState: {
      ui: { ...initialState },
    },
  })
}

describe('Testing in useUiStore', () => {
  test('should return default values', () => {
    // Modifico un state de mi store ficticio
    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook(() => useUiStore(), {
      // Al intentar usar el hook useUiStore nos dara un error porque necesitamos encerrar el hook en un provider de react redux, y como el hook no es un archivo jsx entonces usamos la opcion wrapper para envolver el hook en el componente Provider y asi poder proveer el store al hook. Para que se entienda mejor "children" es lo que retorna el hook, en este caso retorna un objeto con estados y funciones
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      closeDateModal: expect.any(Function),
      openDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    })
  })

  test('openDateModal should change isDateModalOpen state to true', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })
    const { openDateModal } = result.current

    act(() => {
      openDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
  })

  test('closeDateModal should set false in isDateModalOpen', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })
    const { closeDateModal } = result.current

    act(() => {
      closeDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()
  })

  test('toggleDateModal should change the state', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    act(() => {
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeFalsy()

    act(() => {
      result.current.toggleDateModal()
    })

    expect(result.current.isDateModalOpen).toBeTruthy()
  })
})
