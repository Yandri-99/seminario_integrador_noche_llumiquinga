import React, { useState } from "react";

const mp_DigitalCounter: React.FC = () => {
  const [passengerCount, setPassengerCount] = useState<number>(0);
  const capacity = 50;

  const increment = () => {
    if (passengerCount < capacity) {
      setPassengerCount((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (passengerCount > 0) {
      setPassengerCount((prev) => prev - 1);
    }
  };

  const reset = () => setPassengerCount(0);

  const getPercentage = () => (passengerCount / capacity) * 100;

  const getColor = () => {
    const pct = getPercentage();
    if (pct < 50) return "#27ae60";
    if (pct < 80) return "#f39c12";
    return "#e74c3c";
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "400px" }}>
      <h2>Contador de Pasajeros</h2>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: getColor(),
          textAlign: "center",
          margin: "16px 0",
        }}
      >
        {passengerCount} / {capacity}
      </div>

      <div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: `${getPercentage()}%`,
            height: "100%",
            backgroundColor: getColor(),
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p style={{ textAlign: "center", color: getColor() }}>
        {getPercentage() >= 100 ? "🚫 Bus LLENO" : `Ocupación: ${Math.round(getPercentage())}%`}
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={decrement} disabled={passengerCount === 0} style={{ padding: "10px 20px" }}>
          ➖ Bajar
        </button>
        <button onClick={reset} style={{ padding: "10px 20px" }}>
          🔄 Reset
        </button>
        <button onClick={increment} disabled={passengerCount >= capacity} style={{ padding: "10px 20px" }}>
          ➕ Subir
        </button>
      </div>
    </div>
  );
};

export default mp_DigitalCounter;
