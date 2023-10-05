import { useSelector, useDispatch } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onRemoveActiveEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const removeActiveEvent = () => {
    dispatch(onRemoveActiveEvent())
  }

  // Cuando el nombre de la funcion comienza con "start" quiere decir que va a iniciar un proceso de grabación, por lo tanto nos indica que sera funcion asíncrona
  const startSavingEvent = async calendarEvent => {
    // TODO: llegar al backend

    // Todo bien
    if (calendarEvent._id) {
      // Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = async () => {
    dispatch(onDeleteEvent())
  }

  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: Boolean(activeEvent),

    //* Methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    removeActiveEvent
  }
}
