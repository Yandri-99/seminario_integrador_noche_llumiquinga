import React from "react";
import { useAuth } from "./mp_AuthContext";

const mp_AppHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#1e3a5f",
        color: "white",
        borderRadius: "8px",
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: "20px" }}>🚌 Sistema de Transporte Público</h1>
      </div>

      {isAuthenticated && user && (
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>{user.nombre}</p>
            <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>
              {user.role === "conductor" && `Conductor - ${user.rutaAsignada || "Sin ruta"}`}
              {user.role === "administrador" && "Administrador del Sistema"}
              {user.role === "pasajero" && "Pasajero"}
            </p>
          </div>
          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default mp_AppHeader;
