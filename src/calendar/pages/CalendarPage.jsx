import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '..';
import { localizer, getMessages } from '../../helpers';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks';

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  // eslint-disable-next-line no-unused-vars
  const [lastView, seTlastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  // event, start, end, isSelected
  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  // Esta funcion se ejecutara cuando se haga doble click en el evento del calendar
  const onDoubleClick = () => {
    openDateModal();
  };

  // Esta funcion se ejecutara cuando se haga un click en el evento del calendar
  const onSelect = (event) => {
    setActiveEvent(event);
  };

  // Esta funcion se ejecutara cuando cambie la vista del calendar, por ejemplo de mes a semana o de semana a agenda, etc.
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  };

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
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
