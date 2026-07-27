import React, { useReducer } from "react";

interface CounterState {
  count: number;
  history: number[];
}

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1],
      };
    case "DECREMENT":
      return {
        count: Math.max(0, state.count - 1),
        history: [...state.history, Math.max(0, state.count - 1)],
      };
    case "RESET":
      return {
        count: 0,
        history: [...state.history, 0],
      };
    case "SET":
      return {
        count: Math.max(0, action.payload),
        history: [...state.history, Math.max(0, action.payload)],
      };
    default:
      return state;
  }
};

const mp_BasicCounter: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0],
  });

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "400px" }}>
      <h2>🚌 Contador de Pasajeros con Reducer</h2>

      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          textAlign: "center",
          color: state.count >= 50 ? "#e74c3c" : "#27ae60",
          margin: "16px 0",
        }}
      >
        {state.count}
      </div>

      <p style={{ textAlign: "center", color: "#666" }}>
        {state.count >= 50 ? "🚫 Bus lleno" : `Capacidad: ${state.count}/50 pasajeros`}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "16px" }}>
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={state.count === 0}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: state.count === 0 ? "not-allowed" : "pointer",
            opacity: state.count === 0 ? 0.5 : 1,
          }}
        >
          ➖ Bajar
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            backgroundColor: "#f39c12",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🔄 Reset
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          disabled={state.count >= 50}
          style={{
            padding: "12px 24px",
            fontSize: "18px",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: state.count >= 50 ? "not-allowed" : "pointer",
            opacity: state.count >= 50 ? 0.5 : 1,
          }}
        >
          ➕ Subir
        </button>
      </div>

      <div style={{ marginTop: "16px" }}>
        <h4>📜 Historial de cambios:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {state.history.slice(-10).map((value, index) => (
            <span
              key={index}
              style={{
                padding: "4px 8px",
                backgroundColor: "#ecf0f1",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default mp_BasicCounter;
