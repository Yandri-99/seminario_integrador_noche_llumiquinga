import React, { useState } from "react";

interface DriverProfile {
  nombre: string;
  apellido: string;
  licencia: string;
  rutaAsignada: string;
  telefono: string;
}

const mp_UserProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<DriverProfile>({
    nombre: "",
    apellido: "",
    licencia: "",
    rutaAsignada: "",
    telefono: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setProfile({ nombre: "", apellido: "", licencia: "", rutaAsignada: "", telefono: "" });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div style={{ padding: "20px", border: "2px solid #27ae60", borderRadius: "10px", maxWidth: "500px" }}>
        <h2>✅ Registro Exitoso</h2>
        <p><strong>Nombre:</strong> {profile.nombre} {profile.apellido}</p>
        <p><strong>Licencia:</strong> {profile.licencia}</p>
        <p><strong>Ruta Asignada:</strong> {profile.rutaAsignada}</p>
        <p><strong>Teléfono:</strong> {profile.telefono}</p>
        <button onClick={handleReset} style={{ marginTop: "12px", padding: "8px 16px" }}>
          Registrar otro conductor
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}
    >
      <h2>📋 Registro de Conductor</h2>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={profile.nombre}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={profile.apellido}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Número de Licencia:</label>
        <input
          type="text"
          name="licencia"
          value={profile.licencia}
          onChange={handleChange}
          required
          placeholder="Ej: LIC-2024-001"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Ruta Asignada:</label>
        <select
          name="rutaAsignada"
          value={profile.rutaAsignada}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
        >
          <option value="">Seleccionar ruta...</option>
          <option value="Ruta 1 - Centro">Ruta 1 - Centro</option>
          <option value="Ruta 2 - Norte">Ruta 2 - Norte</option>
          <option value="Ruta 3 - Sur">Ruta 3 - Sur</option>
          <option value="Ruta 4 - Este">Ruta 4 - Este</option>
          <option value="Ruta 5 - Oeste">Ruta 5 - Oeste</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          value={profile.telefono}
          onChange={handleChange}
          required
          placeholder="Ej: 555-0123"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#2980b9", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Registrar Conductor
      </button>
    </form>
  );
};

export default mp_UserProfileForm;
