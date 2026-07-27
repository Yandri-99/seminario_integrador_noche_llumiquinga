import { useState, useEffect } from "react";

function mp_useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default mp_useLocalStorage;

// Ejemplo de uso:
interface BusPreferences {
  rutaFavorita: string;
  asientoPreferido: "ventana" | "pasillo" | "ninguno";
  volumenAlertas: number;
  modoOscuro: boolean;
}

export const EjemploUso: React.FC = () => {
  const [preferencias, setPreferencias] = mp_useLocalStorage<BusPreferences>("bus-preferences", {
    rutaFavorita: "Ruta 1 - Centro",
    asientoPreferido: "ventana",
    volumenAlertas: 70,
    modoOscuro: false,
  });

  const [contadorVisitas, setContadorVisitas] = mp_useLocalStorage<number>("bus-visits", 0);

  useEffect(() => {
    setContadorVisitas((prev) => prev + 1);
  }, []);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>💾 Hook Personalizado - useLocalStorage</h2>
      <p style={{ color: "#666" }}>Las preferencias se guardan automáticamente en localStorage</p>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Ruta favorita:
        </label>
        <select
          value={preferencias.rutaFavorita}
          onChange={(e) => setPreferencias((prev) => ({ ...prev, rutaFavorita: e.target.value }))}
          style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
        >
          <option value="Ruta 1 - Centro">Ruta 1 - Centro</option>
          <option value="Ruta 2 - Norte">Ruta 2 - Norte</option>
          <option value="Ruta 3 - Sur">Ruta 3 - Sur</option>
          <option value="Ruta 4 - Este">Ruta 4 - Este</option>
          <option value="Ruta 5 - Oeste">Ruta 5 - Oeste</option>
        </select>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Asiento preferido:
        </label>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["ventana", "pasillo", "ninguno"] as const).map((asiento) => (
            <button
              key={asiento}
              onClick={() => setPreferencias((prev) => ({ ...prev, asientoPreferido: asiento }))}
              style={{
                flex: 1,
                padding: "8px",
                backgroundColor: preferencias.asientoPreferido === asiento ? "#2980b9" : "#ecf0f1",
                color: preferencias.asientoPreferido === asiento ? "white" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {asiento}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>
          Volumen de alertas: {preferencias.volumenAlertas}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={preferencias.volumenAlertas}
          onChange={(e) => setPreferencias((prev) => ({ ...prev, volumenAlertas: parseInt(e.target.value) }))}
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={preferencias.modoOscuro}
            onChange={(e) => setPreferencias((prev) => ({ ...prev, modoOscuro: e.target.checked }))}
          />
          <span>Modo oscuro</span>
        </label>
      </div>

      <div style={{ padding: "12px", backgroundColor: "#ebf5fb", borderRadius: "6px" }}>
        <p style={{ margin: 0 }}>
          <strong>Visitas a esta página:</strong> {contadorVisitas}
        </p>
      </div>
    </div>
  );
};
