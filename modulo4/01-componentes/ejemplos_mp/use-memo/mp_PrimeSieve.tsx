import React, { useState, useMemo } from "react";

const mp_PrimeSieve: React.FC = () => {
  const [maxNumber, setMaxNumber] = useState<number>(50);

  const primes = useMemo(() => {
    if (maxNumber < 2) return [];

    const sieve = new Array(maxNumber + 1).fill(true);
    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i * i <= maxNumber; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= maxNumber; j += i) {
          sieve[j] = false;
        }
      }
    }

    const result: number[] = [];
    for (let i = 2; i <= maxNumber; i++) {
      if (sieve[i]) {
        result.push(i);
      }
    }
    return result;
  }, [maxNumber]);

  const routeDistances = useMemo(() => {
    return primes.map((p) => ({
      prime: p,
      distancia: p * 2.5,
      tiempoEstimado: Math.round(p * 1.5),
    }));
  }, [primes]);

  const totalDistancia = useMemo(() => {
    return routeDistances.reduce((sum, r) => sum + r.distancia, 0);
  }, [routeDistances]);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "600px" }}>
      <h2>🔢 Calculadora de Distancias con Criba de Primos</h2>
      <p style={{ color: "#666" }}>
        Los números primos se usan para calcular distancias de rutas del transporte público
      </p>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Número máximo:
        </label>
        <input
          type="range"
          min="2"
          max="100"
          value={maxNumber}
          onChange={(e) => setMaxNumber(parseInt(e.target.value))}
          style={{ width: "100%" }}
        />
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{maxNumber}</span>
      </div>

      <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#ebf5fb", borderRadius: "6px" }}>
        <p style={{ margin: 0 }}>
          <strong>Primos encontrados:</strong> {primes.length}
        </p>
        <p style={{ margin: "4px 0 0 0" }}>
          <strong>Distancia total de rutas:</strong> {totalDistancia.toFixed(2)} km
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
        {routeDistances.map(({ prime, distancia, tiempoEstimado }) => (
          <div
            key={prime}
            style={{
              padding: "12px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2980b9" }}>{prime}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{distancia.toFixed(1)} km</div>
            <div style={{ fontSize: "11px", color: "#999" }}>{tiempoEstimado} min</div>
          </div>
        ))}
      </div>

      {primes.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
          No hay números primos en el rango seleccionado
        </p>
      )}
    </div>
  );
};

export default mp_PrimeSieve;
