import React from "react";

interface WelcomeBannerProps {
  systemName?: string;
  totalRoutes?: number;
  activeBuses?: number;
}

const mp_WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  systemName = "TransiTUy",
  totalRoutes = 15,
  activeBuses = 42,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3a5f, #2980b9)",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h1>🚌 Bienvenido a {systemName}</h1>
      <p style={{ fontSize: "18px", margin: "8px 0" }}>
        Gestión de Transporte Público en Tiempo Real
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "12px" }}>
        <div>
          <strong>{totalRoutes}</strong>
          <p style={{ margin: 0 }}>Rutas Activas</p>
        </div>
        <div>
          <strong>{activeBuses}</strong>
          <p style={{ margin: 0 }}>Buses en Circulación</p>
        </div>
      </div>
    </div>
  );
};

export default mp_WelcomeBanner;
