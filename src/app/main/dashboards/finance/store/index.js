import { combineReducers } from '@reduxjs/toolkit';
import widgets from './widgetsSlice';
import myWidgetReducer from './myWidgetSlice'; // Ajusta el path al archivo correcto

const reducer = combineReducers({
  widgets,
  fetchWidgetData: myWidgetReducer, // Usamos un nombre único para el slice en el estado global
});

export default reducer;