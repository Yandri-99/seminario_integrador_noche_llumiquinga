import React, { useState } from "react";
import { useAuth } from "./mp_AuthContext";

const mp_LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"conductor" | "administrador" | "pasajero">("conductor");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      login({
        id: Date.now(),
        nombre: username,
        role,
        rutaAsignada: role === "conductor" ? "Ruta 1 - Centro" : undefined,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "24px",
        border: "2px solid #333",
        borderRadius: "10px",
        maxWidth: "400px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🔐 Iniciar Sesión - Transporte</h2>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Usuario:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ingrese su nombre"
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Contraseña:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Tipo de usuario:
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "conductor" | "administrador" | "pasajero")}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="conductor">🚌 Conductor</option>
          <option value="administrador">👔 Administrador</option>
          <option value="pasajero">🧑 Pasajero</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#27ae60",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Ingresar al Sistema
      </button>
    </form>
  );
};

export default mp_LoginForm;
