import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
           return (state = action.payload);
    },
  },
});

export const { filterChange } = filterSlice.actions;

export default filterSlice.reducer;

export const getFilterValue = state => state.filter;
