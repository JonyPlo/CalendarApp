import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '..'
import { localizer, getMessages } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'
import { useEffect } from 'react'

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { events, setActiveEvent, removeActiveEvent, startLoadingEvents } =
    useCalendarStore()
  const { openDateModal, isDateModalOpen } = useUiStore()

  const lastView = localStorage.getItem('lastView') || 'week'

  const eventStyleGetter = event => {
    const { _id: eventId = '' } = event.user
    const { _id: userId } = user

    const isMyEvent = userId === eventId

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  // Funcion que se ejecuta al hacer doble click en un evento
  const onDoubleClick = () => {
    openDateModal()
  }

  // Funcion que se ejecuta al hacer un click en un evento
  const onSelect = event => {
    setActiveEvent(event)
  }

  /**
   * Funcion que cambia la vista del calendar y la mantiene persistente
   * @param {object} event - Objeto con la informacion de la vista del calendar.
   */
  const onViewChanged = event => {
    localStorage.setItem('lastView', event)
  }

  const onSelectSlot = () => {
    removeActiveEvent()
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
        onSelectSlot={onSelectSlot}
        selectable={true}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete isDateModalOpen={isDateModalOpen} />
    </>
  )
}
