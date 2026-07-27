import React, { useReducer } from "react";

interface FormState {
  step: number;
  datos: {
    nombre: string;
    apellido: string;
    licencia: string;
    experiencia: string;
    rutaPreferida: string;
    telefono: string;
  };
}

type FormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "UPDATE_FIELD"; field: string; value: string }
  | { type: "RESET" };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 3) };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 1) };
    case "UPDATE_FIELD":
      return {
        ...state,
        datos: { ...state.datos, [action.field]: action.value },
      };
    case "RESET":
      return {
        step: 1,
        datos: {
          nombre: "",
          apellido: "",
          licencia: "",
          experiencia: "",
          rutaPreferida: "",
          telefono: "",
        },
      };
    default:
      return state;
  }
};

const mp_RegistrationForm: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, {
    step: 1,
    datos: {
      nombre: "",
      apellido: "",
      licencia: "",
      experiencia: "",
      rutaPreferida: "",
      telefono: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch({ type: "UPDATE_FIELD", field: e.target.name, value: e.target.value });
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box" as const,
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return (
          <div>
            <h3>👤 Paso 1: Datos Personales</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Nombre:</label>
              <input type="text" name="nombre" value={state.datos.nombre} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Apellido:</label>
              <input type="text" name="apellido" value={state.datos.apellido} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Teléfono:</label>
              <input type="tel" name="telefono" value={state.datos.telefono} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3>🪪 Paso 2: Licencia y Experiencia</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Número de Licencia:</label>
              <input type="text" name="licencia" value={state.datos.licencia} onChange={handleChange} placeholder="LIC-2024-XXX" style={inputStyle} />
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Años de Experiencia:</label>
              <select name="experiencia" value={state.datos.experiencia} onChange={handleChange} style={inputStyle}>
                <option value="">Seleccionar...</option>
                <option value="0-1">0-1 años</option>
                <option value="1-3">1-3 años</option>
                <option value="3-5">3-5 años</option>
                <option value="5+">5+ años</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>🚌 Paso 3: Asignación de Ruta</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", marginBottom: "4px" }}>Ruta Preferida:</label>
              <select name="rutaPreferida" value={state.datos.rutaPreferida} onChange={handleChange} style={inputStyle}>
                <option value="">Seleccionar ruta...</option>
                <option value="Ruta 1 - Centro">Ruta 1 - Centro</option>
                <option value="Ruta 2 - Norte">Ruta 2 - Norte</option>
                <option value="Ruta 3 - Sur">Ruta 3 - Sur</option>
                <option value="Ruta 4 - Este">Ruta 4 - Este</option>
                <option value="Ruta 5 - Oeste">Ruta 5 - Oeste</option>
              </select>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>✅ Registro Completado</h3>
            <p><strong>Nombre:</strong> {state.datos.nombre} {state.datos.apellido}</p>
            <p><strong>Licencia:</strong> {state.datos.licencia}</p>
            <p><strong>Experiencia:</strong> {state.datos.experiencia} años</p>
            <p><strong>Ruta Asignada:</strong> {state.datos.rutaPreferida}</p>
            <p><strong>Teléfono:</strong> {state.datos.telefono}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>📝 Registro de Conductor - Formulario Multi-Paso</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: state.step >= s ? "#2980b9" : "#ecf0f1",
              color: state.step >= s ? "white" : "#333",
              fontWeight: "bold",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      <div style={{ minHeight: "200px", marginBottom: "20px" }}>{renderStep()}</div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => dispatch({ type: "PREV_STEP" })}
          disabled={state.step === 1}
          style={{
            padding: "10px 20px",
            opacity: state.step === 1 ? 0.5 : 1,
            cursor: state.step === 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Anterior
        </button>
        {state.step < 4 ? (
          <button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            style={{ padding: "10px 20px", backgroundColor: "#27ae60", color: "white", border: "none", borderRadius: "4px" }}
          >
            Siguiente →
          </button>
        ) : (
          <button
            onClick={() => dispatch({ type: "RESET" })}
            style={{ padding: "10px 20px", backgroundColor: "#f39c12", color: "white", border: "none", borderRadius: "4px" }}
          >
            🔄 Nuevo Registro
          </button>
        )}
      </div>
    </div>
  );
};

export default mp_RegistrationForm;
