import { useSelector, useDispatch } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onRemoveActiveEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'
import { calendarApi } from '../api'
import Swal from 'sweetalert2'
import { convertEventsToDateEvents } from '../helpers'

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

  /**
   * Create or update calendar event
   *
   * @async
   * @param {object} calendarEvent - Active event state
   */
  const startSavingEvent = async calendarEvent => {
    try {
      // Update Event
      if (calendarEvent.id) {
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        )

        if (data.ok) {
          dispatch(onUpdateEvent({ ...calendarEvent, user }))

          return Swal.fire(
            'Updated!',
            `The event "${data.event.title}" was updated!`,
            'success'
          )
        }
      }

      // Create Event
      const { data } = await calendarApi.post('/events', calendarEvent)

      if (data.ok) {
        dispatch(
          onAddNewEvent({
            ...calendarEvent,
            id: data.event.id,
            user
          })
        )

        Swal.fire(
          'Saved!',
          `The event "${data.event.title}" was saved!`,
          'success'
        )
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error!', 'Error creating or updating event!', 'error')
    }
  }

  /**
   * Delete calendar event
   *
   * @async
   * @param {object} calendarEvent - Active event state
   */
  const startDeletingEvent = calendarEvent => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#347CF7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const { data } = await calendarApi.delete(
            `/events/${calendarEvent.id}`
          )

          if (data.ok) {
            dispatch(onDeleteEvent())

            Swal.fire('Deleted!', `${data.msg}`, 'success')
          }
        } catch (error) {
          console.log(error)
          Swal.fire('Error!', 'Error deleting event!', 'error')
        }
      }
    })
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.events)

      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error)
      Swal.fire('Error!', 'Error loading events', 'error')
    }
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
    removeActiveEvent,
    startLoadingEvents
  }
}
