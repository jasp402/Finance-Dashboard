import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWidgetData, selectWidget } from "../store/myWidgetSlice";

const TestWidget = () => {
  const dispatch = useDispatch();

  // Agregar log para entender lo que el selector está intentando acceder
  const widgetState = useSelector((state) => {
    console.log('[TestWidget:Selector] Estado completo en Redux:', state); // Log: Qué hay en el estado global
    return selectWidget(state);
  });

  console.log("Estado actual del widget:", widgetState); // Debug del estado seleccionado

  useEffect(() => {
    console.log("Despachando fetchWidgetData...");
    dispatch(fetchWidgetData());
  }, [dispatch]);

  // Renderizado basado en el estado actual
  if (!widgetState) {
    return <div>Estado no disponible o no inicializado</div>;
  }

  if (widgetState.loading) {
    return <div>Cargando datos...</div>;
  }

  if (widgetState.error) {
    return <div>Error: {widgetState.error}</div>;
  }

  return (
    <div>
      <h1>Datos del Widget:</h1>
      <pre>{JSON.stringify(widgetState, null, 2)}</pre>
    </div>
  );
};

export default TestWidget;