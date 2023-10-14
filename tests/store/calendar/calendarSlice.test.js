import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice'
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from '../../fixtures/calendarStates'

describe('Testing in calendarSlice', () => {
  test('should return the initialState', () => {
    const state = calendarSlice.getInitialState()
    expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent should activate the event', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    )

    expect(state.activeEvent).toEqual(events[0])
  })

  test('onAddNewEvent should add an event', () => {
    const newEvent = {
      id: '3',
      start: new Date('2023-03-12 13:00:00'),
      end: new Date('2023-03-12 15:00:00'),
      title: 'Call meeting',
      notes: 'Work meeting ',
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    )

    expect(state.events).toEqual([...events, newEvent])
  })

  test('onUpdateEvent should update the event', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2023-03-12 13:00:00'),
      end: new Date('2023-03-12 15:00:00'),
      title: 'Boss birthday updated',
      notes: 'Buy a cake updated',
    }
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    )

    expect(state.events).toContain(updatedEvent)
  })

  test('onDeleteEvent should delete the active event', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    )

    expect(state.activeEvent).toBe(null)
    expect(state.events).not.toContain(events[0])
  })

  test('onLoadEvents should set the states', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))

    expect(state.isLoadingEvents).toBeFalsy()
    expect(state.events).toEqual(events)

    const newState = calendarSlice.reducer(initialState, onLoadEvents(events))

    expect(newState.events.length).toBe(events.length)
  })

  test('onLogoutCalendar should clear the state', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    )

    expect(state.isLoadingEvents).toBeTruthy()
    expect(state).toEqual(initialState)
  })
})
