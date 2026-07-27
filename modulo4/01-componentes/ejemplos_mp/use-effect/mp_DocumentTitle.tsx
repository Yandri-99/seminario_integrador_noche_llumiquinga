import React, { useState, useEffect } from "react";

const mp_DocumentTitle: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState("Ruta 1 - Centro");
  const routes = [
    "Ruta 1 - Centro",
    "Ruta 2 - Norte",
    "Ruta 3 - Sur",
    "Ruta 4 - Este",
    "Ruta 5 - Oeste",
  ];

  useEffect(() => {
    document.title = `🚌 ${currentRoute} - Transporte Público`;
    return () => {
      document.title = "Sistema de Transporte Público";
    };
  }, [currentRoute]);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>📍 Cambio de Título - Ruta Actual</h2>
      <p style={{ color: "#666" }}>El título del documento se actualiza con la ruta seleccionada:</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
        {routes.map((route) => (
          <button
            key={route}
            onClick={() => setCurrentRoute(route)}
            style={{
              padding: "12px",
              backgroundColor: currentRoute === route ? "#2980b9" : "#ecf0f1",
              color: currentRoute === route ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "16px",
            }}
          >
            🚌 {route}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#d5f5e3", borderRadius: "6px" }}>
        <strong>Título actual:</strong> 🚌 {currentRoute} - Transporte Público
      </div>
    </div>
  );
};

export default mp_DocumentTitle;
