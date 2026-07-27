import React, { useState, useEffect } from "react";

interface RouteData {
  id: number;
  nombre: string;
  origen: string;
  destino: string;
  distancia: number;
  tiempoEstimado: number;
}

const mp_FetchUser: React.FC = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData: RouteData[] = [
          { id: 1, nombre: "Ruta Centro", origen: "Terminal Norte", destino: "Plaza Mayor", distancia: 12.5, tiempoEstimado: 35 },
          { id: 2, nombre: "Ruta Norte", origen: "Estación Central", destino: "Barrio Norte", distancia: 8.3, tiempoEstimado: 25 },
          { id: 3, nombre: "Ruta Sur", origen: "Terminal Sur", destino: "Universidad", distancia: 15.7, tiempoEstimado: 45 },
          { id: 4, nombre: "Ruta Este", origen: "Centro Comercial", destino: "Zona Industrial", distancia: 10.2, tiempoEstimado: 30 },
          { id: 5, nombre: "Ruta Oeste", origen: "Parque Central", destino: "Residencial Los Pinos", distancia: 7.8, tiempoEstimado: 20 },
        ];

        setRoutes(mockData);
        setError(null);
      } catch (err) {
        setError("Error al cargar las rutas del transporte público");
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>🔄 Cargando rutas del transporte...</h2>
        <p>Obteniendo información del sistema de rutas</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red", textAlign: "center" }}>
        <h2>❌ {error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "600px" }}>
      <h2>🗺️ Rutas del Transporte Público</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => setSelectedRoute(route)}
            style={{
              padding: "16px",
              border: `2px solid ${selectedRoute?.id === route.id ? "#2980b9" : "#ddd"}`,
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: selectedRoute?.id === route.id ? "#ebf5fb" : "white",
              transition: "all 0.2s",
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>🚌 {route.nombre}</h3>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Origen:</strong> {route.origen}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Destino:</strong> {route.destino}
            </p>
          </div>
        ))}
      </div>

      {selectedRoute && (
        <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#d5f5e3", borderRadius: "8px" }}>
          <h3>📋 Detalles de {selectedRoute.nombre}</h3>
          <p><strong>Distancia:</strong> {selectedRoute.distancia} km</p>
          <p><strong>Tiempo estimado:</strong> {selectedRoute.tiempoEstimado} minutos</p>
          <p><strong>Recorrido:</strong> {selectedRoute.origen} → {selectedRoute.destino}</p>
        </div>
      )}
    </div>
  );
};

export default mp_FetchUser;
