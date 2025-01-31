import { createSlice } from '@reduxjs/toolkit';

const myCalendarSlice = createSlice({
  name: 'myCalendar',
  initialState: {
    isLoadingMyCalendar: false,
    visibleModalInfoClassOfCalendar: false,
    myCalendar: [],

  },
  reducers: {
    getListMyCalendar: (state) => ({
      ...state,
      isLoadingMyCalendar: true,
    }),
    getListMyCalendarSuccess: (state, action) => ({
      ...state,
      myCalendar: action.payload.data.classes,

    }),
    getListMyCalendarFailure: (state) => ({
      ...state,
      isLoadingMyCalendar: false,
      myCalendar: [],
    }),
    setVisibleModalInfoClassOfCalendar: (state, action) => ({
      ...state,
      visibleModalInfoClassOfCalendar: action.payload,
    }),
    
  },
});

export const {
  getListMyCalendar,
  getListMyCalendarSuccess,
  getListMyCalendarFailure,
  setVisibleModalInfoClassOfCalendar
  
} = myCalendarSlice.actions;

export default myCalendarSlice.reducer;
