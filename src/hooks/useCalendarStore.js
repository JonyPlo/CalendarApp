import { useSelector, useDispatch } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onRemoveActiveEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'
import { calendarApi } from '../api'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

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
      // Update Event
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // Create Event

      const { data } = await calendarApi.post('/events', calendarEvent)

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
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
