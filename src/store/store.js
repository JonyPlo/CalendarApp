import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice, uiSlice } from './'

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer
  },
  // Aqui van los middlewares
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false // Este middleware se utiliza en Redux Toolkit para desactivar la comprobación de serialización de acciones y estado1 2. Por defecto, Redux Toolkit agrega un middleware llamado serializabilityMiddleware que detecta si se han incluido valores no serializables en el estado o en las acciones despachadas2. Si se detectan valores no serializables, se mostrarán en la consola2. Al establecer serializableCheck: false, puedes evitar que Redux Toolkit realice esta comprobación para un slice específico1.
    })
})
