import React, { useState, useCallback, useEffect } from "react";

interface RouteResult {
  id: number;
  nombre: string;
  origen: string;
  destino: string;
  distancia: number;
}

const allRoutes: RouteResult[] = [
  { id: 1, nombre: "Ruta Centro", origen: "Terminal Norte", destino: "Plaza Mayor", distancia: 12.5 },
  { id: 2, nombre: "Ruta Norte", origen: "Estación Central", destino: "Barrio Norte", distancia: 8.3 },
  { id: 3, nombre: "Ruta Sur", origen: "Terminal Sur", destino: "Universidad", distancia: 15.7 },
  { id: 4, nombre: "Ruta Este", origen: "Centro Comercial", destino: "Zona Industrial", distancia: 10.2 },
  { id: 5, nombre: "Ruta Oeste", origen: "Parque Central", destino: "Residencial Los Pinos", distancia: 7.8 },
  { id: 6, nombre: "Ruta Circunvalar", origen: "Terminal Principal", destino: "Aeropuerto", distancia: 35.0 },
  { id: 7, nombre: "Ruta Universitaria", origen: "Centro", destino: "Campus Universitario", distancia: 5.4 },
  { id: 8, nombre: "Ruta Costera", origen: "Malecón", destino: "Playa del Sol", distancia: 18.9 },
];

const mp_SearchWithFetch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<RouteResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchRoutes = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Simular una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered = allRoutes.filter(
      (route) =>
        route.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.origen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.destino.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchRoutes(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchRoutes]);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>🔍 Buscador de Rutas con Fetch</h2>

      <div style={{ position: "relative", marginBottom: "16px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ruta, origen o destino..."
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "2px solid #ddd",
            boxSizing: "border-box",
          }}
        />
        {loading && (
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            ⏳
          </span>
        )}
      </div>

      <div style={{ fontSize: "14px", color: "#666", marginBottom: "12px" }}>
        {hasSearched && !loading && `${results.length} resultado(s) encontrado(s)`}
      </div>

      <div>
        {results.map((route) => (
          <div
            key={route.id}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>🚌 {route.nombre}</h4>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              📍 {route.origen} → {route.destino}
            </p>
            <p style={{ margin: "4px 0", fontSize: "14px", color: "#666" }}>
              📏 Distancia: {route.distancia} km
            </p>
          </div>
        ))}
      </div>

      {hasSearched && !loading && results.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
          <p>🔍 No se encontraron rutas para "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default mp_SearchWithFetch;
