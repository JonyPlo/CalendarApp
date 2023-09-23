import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent =   {
  title: 'Cumpleaños del Jefe',
  notes: 'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Jonathan',
  },
};

const initialState = {
  events: [
    tempEvent
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    reducerName: (state /* action */) => {
      console.log(state.calendar);
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducerName } = calendarSlice.actions;
