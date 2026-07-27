import React, { useState, useMemo } from "react";

interface Bus {
  id: number;
  placa: string;
  marca: string;
  capacidad: number;
  tipo: "articulado" | "padron" | "escolar" | "ejecutivo";
  anio: number;
  activo: boolean;
}

const busesData: Bus[] = [
  { id: 1, placa: "ABC-123", marca: "Mercedes-Benz", capacidad: 80, tipo: "articulado", anio: 2020, activo: true },
  { id: 2, placa: "DEF-456", marca: "Volvo", capacidad: 50, tipo: "padron", anio: 2019, activo: true },
  { id: 3, placa: "GHI-789", marca: "Hyundai", capacidad: 30, tipo: "escolar", anio: 2021, activo: true },
  { id: 4, placa: "JKL-012", marca: "Scania", capacidad: 45, tipo: "ejecutivo", anio: 2022, activo: true },
  { id: 5, placa: "MNO-345", marca: "Mercedes-Benz", capacidad: 80, tipo: "articulado", anio: 2018, activo: false },
  { id: 6, placa: "PQR-678", marca: "Volvo", capacidad: 50, tipo: "padron", anio: 2023, activo: true },
  { id: 7, placa: "STU-901", marca: "Hyundai", capacidad: 30, tipo: "escolar", anio: 2020, activo: true },
  { id: 8, placa: "VWX-234", marca: "Scania", capacidad: 45, tipo: "ejecutivo", anio: 2021, activo: false },
  { id: 9, placa: "YZA-567", marca: "Mercedes-Benz", capacidad: 80, tipo: "articulado", anio: 2024, activo: true },
  { id: 10, placa: "BCD-890", marca: "Volvo", capacidad: 50, tipo: "padron", anio: 2022, activo: true },
];

const mp_FilteredCatalog: React.FC = () => {
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [marcaFilter, setMarcaFilter] = useState<string>("todas");
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  const filteredBuses = useMemo(() => {
    return busesData.filter((bus) => {
      const matchesTipo = tipoFilter === "todos" || bus.tipo === tipoFilter;
      const matchesMarca = marcaFilter === "todas" || bus.marca === marcaFilter;
      const matchesActive = !showActiveOnly || bus.activo;
      return matchesTipo && matchesMarca && matchesActive;
    });
  }, [tipoFilter, marcaFilter, showActiveOnly]);

  const stats = useMemo(() => {
    const total = filteredBuses.length;
    const activos = filteredBuses.filter((b) => b.activo).length;
    const capacidadTotal = filteredBuses.reduce((sum, b) => sum + b.capacidad, 0);
    const promedioCapacidad = total > 0 ? Math.round(capacidadTotal / total) : 0;
    return { total, activos, capacidadTotal, promedioCapacidad };
  }, [filteredBuses]);

  const marcas = useMemo(() => [...new Set(busesData.map((b) => b.marca))], []);

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "700px" }}>
      <h2>🚌 Catálogo Filtrado de Buses</h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
        <select
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="todos">Todos los tipos</option>
          <option value="articulado">Articulado</option>
          <option value="padron">Padrón</option>
          <option value="escolar">Escolar</option>
          <option value="ejecutivo">Ejecutivo</option>
        </select>

        <select
          value={marcaFilter}
          onChange={(e) => setMarcaFilter(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="todas">Todas las marcas</option>
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <input
            type="checkbox"
            checked={showActiveOnly}
            onChange={(e) => setShowActiveOnly(e.target.checked)}
          />
          Solo activos
        </label>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#ebf5fb", borderRadius: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2980b9" }}>{stats.total}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Total</div>
        </div>
        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#d5f5e3", borderRadius: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#27ae60" }}>{stats.activos}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Activos</div>
        </div>
        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#fdebd0", borderRadius: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f39c12" }}>{stats.capacidadTotal}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Cap. Total</div>
        </div>
        <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#fadbd8", borderRadius: "8px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#e74c3c" }}>{stats.promedioCapacidad}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>Promedio</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filteredBuses.map((bus) => (
          <div
            key={bus.id}
            style={{
              padding: "12px",
              border: `2px solid ${bus.activo ? "#27ae60" : "#e74c3c"}`,
              borderRadius: "8px",
              backgroundColor: bus.activo ? "#f0fff4" : "#fff5f5",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0" }}>🚌 {bus.placa}</h4>
            <p style={{ margin: "2px 0", fontSize: "13px" }}>Marca: {bus.marca}</p>
            <p style={{ margin: "2px 0", fontSize: "13px" }}>Capacidad: {bus.capacidad} pasajeros</p>
            <p style={{ margin: "2px 0", fontSize: "13px" }}>Tipo: {bus.tipo}</p>
            <p style={{ margin: "2px 0", fontSize: "13px" }}>Año: {bus.anio}</p>
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "12px",
                backgroundColor: bus.activo ? "#27ae60" : "#e74c3c",
                color: "white",
              }}
            >
              {bus.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>
          No se encontraron buses con los filtros seleccionados
        </p>
      )}
    </div>
  );
};

export default mp_FilteredCatalog;
