import React, { useState, useCallback, useMemo } from "react";

interface Route {
  id: number;
  nombre: string;
  distancia: number;
  tiempoEstimado: number;
  activa: boolean;
}

const initialRoutes: Route[] = [
  { id: 1, nombre: "Ruta Centro", distancia: 12.5, tiempoEstimado: 35, activa: true },
  { id: 2, nombre: "Ruta Norte", distancia: 8.3, tiempoEstimado: 25, activa: true },
  { id: 3, nombre: "Ruta Sur", distancia: 15.7, tiempoEstimado: 45, activa: false },
  { id: 4, nombre: "Ruta Este", distancia: 10.2, tiempoEstimado: 30, activa: true },
  { id: 5, nombre: "Ruta Oeste", distancia: 7.8, tiempoEstimado: 20, activa: true },
  { id: 6, nombre: "Ruta Circunvalar", distancia: 22.1, tiempoEstimado: 60, activa: false },
  { id: 7, nombre: "Ruta Universitaria", distancia: 5.4, tiempoEstimado: 15, activa: true },
  { id: 8, nombre: "Ruta Aeropuerto", distancia: 35.0, tiempoEstimado: 45, activa: true },
];

interface RouteItemProps {
  route: Route;
  onSelect: (id: number) => void;
}

const RouteItem: React.FC<RouteItemProps> = React.memo(({ route, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(route.id)}
      style={{
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: route.activa ? "#d5f5e3" : "#fadbd8",
        marginBottom: "8px",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>🚌 {route.nombre}</h4>
      <p style={{ margin: "4px 0", fontSize: "14px" }}>
        📏 {route.distancia} km | ⏱️ {route.tiempoEstimado} min | {route.activa ? "✅ Activa" : "❌ Inactiva"}
      </p>
    </div>
  );
});

RouteItem.displayName = "RouteItem";

const mp_MemoizedList: React.FC = () => {
  const [routes] = useState<Route[]>(initialRoutes);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      if (filter === "active") return route.activa;
      if (filter === "inactive") return !route.activa;
      return true;
    });
  }, [routes, filter]);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>🗺️ Lista Memoizada de Rutas</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(["all", "active", "inactive"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 16px",
              backgroundColor: filter === f ? "#2980b9" : "#ecf0f1",
              color: filter === f ? "white" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {f === "all" ? "Todas" : f === "active" ? "Activas" : "Inactivas"}
          </button>
        ))}
      </div>

      <div>
        {filteredRoutes.map((route) => (
          <RouteItem key={route.id} route={route} onSelect={handleSelect} />
        ))}
      </div>

      {selectedId && (
        <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#ebf5fb", borderRadius: "6px" }}>
          <strong>Ruta seleccionada:</strong> {routes.find((r) => r.id === selectedId)?.nombre}
        </div>
      )}
    </div>
  );
};

export default mp_MemoizedList;
