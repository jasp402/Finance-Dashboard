import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getWidgets = createAsyncThunk('financeDashboardApp/widgets/getWidgets', async () => {
  const analyticsResponse = await axios.get('/api/dashboards/analytics/widgets');
  const financeResponse   = await axios.get('/api/dashboards/finance/widgets');
  return {
    ...financeResponse.data,  // Datos del dashboard financiero
    visitors: analyticsResponse.data.visitors  // Campo específico de analytics
  };
});

const widgetsSlice = createSlice({
  name: 'financeDashboardApp/widgets',
  initialState: null,
  reducers: {},
  extraReducers: {
    [getWidgets.fulfilled]: (state, action) => action.payload,
  },
});

export const selectWidgets = ({ financeDashboardApp }) => financeDashboardApp.widgets;

export default widgetsSlice.reducer;
