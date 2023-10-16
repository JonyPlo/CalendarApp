export const events = [
  {
    id: '1',
    start: new Date('2023-10-21 13:00:00'),
    end: new Date('2023-10-21 15:00:00'),
    title: 'Boss birthday',
    notes: 'Buy a cake',
  },
  {
    id: '2',
    start: new Date('2023-06-19 00:00:00'),
    end: new Date('2023-06-19 02:00:00'),
    title: "Jonathan's birthday",
    notes: 'Buy a present',
  },
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
}

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
}
