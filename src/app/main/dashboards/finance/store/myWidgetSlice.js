import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para obtener datos del widget
export const fetchWidgetData = createAsyncThunk('financeDashboardApp/widgets/fetchWidgetData', async (_, { rejectWithValue }) => {
  const response = await axios.get('/dashboard'); // ajustar luego el endpoint correcto
  const arrayData = response.data;
  // delete response.data[1];
  const result = {};
  arrayData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      result[key] = item[key];
    });
  });
  return result;
});

const fetchWidgetSlice = createSlice({
  name: 'financeDashboardApp/fetchWidgetData',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchWidgetData.fulfilled]: (state, action) => {
      return action.payload;
    },
    [fetchWidgetData.rejected]: (state, action) => {
      return { error: action.payload };
    },
    [fetchWidgetData.pending]: () => {
      return { loading: true };
    },
  },
});


export const selectWidget = ({ financeDashboardApp }) => financeDashboardApp.fetchWidgetData;

export default fetchWidgetSlice.reducer;