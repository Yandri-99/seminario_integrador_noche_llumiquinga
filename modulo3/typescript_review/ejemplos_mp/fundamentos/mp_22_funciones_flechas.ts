// ============================================
// MP_22: Funciones Flecha - Operaciones de Transporte
// ============================================

// --- Función flecha básica ---
const saludarConductor = (nombre: string): string => `¡Hola, conductor ${nombre}!`;

console.log("=== Funciones Flecha ===");
console.log(saludarConductor("Carlos"));
console.log(saludarConductor("María"));

// --- Flecha con cuerpo ---
const calcularVelocidadPromedio = (distancia: number, tiempo: number): number => {
    if (tiempo === 0) return 0;
    return Math.round(distancia / tiempo);
};

console.log(`\nVelocidad promedio: ${calcularVelocidadPromedio(120, 3)} km/h`);

// --- Flecha con parámetros por defecto ---
const configurarBus = (
    placa: string,
    capacidad: number = 40,
    ruta: string = "Sin ruta asignada"
): string => {
    return `Bus ${placa} | Cap: ${capacidad} | Ruta: ${ruta}`;
};

console.log(`\n--- Configurar Bus ---`);
console.log(configurarBus("ABC-123"));
console.log(configurarBus("DEF-456", 50, "Ruta 2"));
console.log(configurarBus("GHI-789", 35, "Ruta 3"));

// --- Flecha con retorno implícito ---
const esActivo = (estado: string): boolean => estado === "activo";
const formatearPlaca = (placa: string): string => placa.toUpperCase();
const generarCodigo = (prefijo: string, numero: number): string => `${prefijo}-${String(numero).padStart(3, "0")}`;

console.log("\n--- Funciones de Utilidad ---");
console.log(`¿Activo? ${esActivo("activo")}`);
console.log(`Placa formateada: ${formatearPlaca("abc-123")}`);
console.log(`Código generado: ${generarCodigo("BUS", 42)}`);

// --- Flecha con map ---
let tarifas: number[] = [2500, 3000, 3500, 4000];
let tarifasConDescuento = tarifas.map(t => t * 0.85);

console.log("\n--- Tarifas con Descuento ---");
tarifas.forEach((original, i) => {
    console.log(`  $${original} → $${tarifasConDescuento[i].toFixed(0)}`);
});

// --- Flecha con filter ---
let buses: { placa: string; combustible: number; activo: boolean }[] = [
    { placa: "ABC-123", combustible: 85, activo: true },
    { placa: "DEF-456", combustible: 15, activo: false },
    { placa: "GHI-789", combustible: 45, activo: true },
    { placa: "JKL-012", combustible: 90, activo: true },
];

let busesListos = buses.filter(b => b.activo && b.combustible > 30);
console.log("\n--- Buses Listos para Salir ---");
busesListos.forEach(b => {
    console.log(`  ${b.placa}: ${b.combustible}% combustible`);
});

// --- Flecha con reduce ---
let ingresosDiarios: number[] = [850000, 920000, 780000, 1050000, 890000];
let totalIngresos = ingresosDiarios.reduce((acum, actual) => acum + actual, 0);

console.log(`\n--- Ingresos de la Semana ---`);
console.log(`Total: $${totalIngresos.toLocaleString()}`);
console.log(`Promedio: $${(totalIngresos / ingresosDiarios.length).toLocaleString()}`);

// --- Flecha como callback ---
let paradas: string[] = ["Terminal", "Plaza", "Hospital", "Universidad"];
let paradasFormateadas = paradas.map((p, i) => `${i + 1}. ${p}`);

console.log("\n--- Paradas Formateadas ---");
paradasFormateadas.forEach(p => console.log(`  ${p}`));

// --- Flecha con closures ---
const crearContador = () => {
    let contador: number = 0;
    return {
        incrementar: (): number => ++contador,
        obtener: (): number => contador
    };
};

console.log("\n--- Contador de Pasajeros ---");
let contadorPasajeros = crearContador();
console.log(`Pasajeros: ${contadorPasajeros.obtener()}`);
contadorPasajeros.incrementar();
contadorPasajeros.incrementar();
contadorPasajeros.incrementar();
console.log(`Pasajeros: ${contadorPasajeros.obtener()}`);

// --- Flecha con arrays anidados ---
let lineas: { nombre: string; paradas: string[] }[] = [
    { nombre: "Línea 1", paradas: ["A", "B", "C"] },
    { nombre: "Línea 2", paradas: ["D", "E", "F"] }
];

let totalParadas = lineas.reduce((total, linea) => total + linea.paradas.length, 0);
console.log(`\nTotal de paradas en todas las líneas: ${totalParadas}`);
