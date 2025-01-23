import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk asíncrono para obtener datos del widget
export const fetchWidgetData = createAsyncThunk('financeDashboardApp/widgets/fetchWidgetData', async (_, { rejectWithValue }) => {
  const response = await axios.get('/dashboard'); // ajustar luego el endpoint correcto
  return response.data;
});

const fetchWidgetSlice = createSlice({
  name: 'financeDashboardApp/fetchWidgetData',
  initialState: null,
  reducers: {},
  extraReducers: {
    [fetchWidgetData.fulfilled]: (state, action) => {
      return action.payload[0];
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