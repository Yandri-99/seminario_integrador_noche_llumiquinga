// ============================================
// MP_09: Arreglos Tipados - Listas de Buses y Rutas
// ============================================

// --- Arreglo tipado de strings: lista de placas ---
let placasBuses: string[] = ["ABC-123", "DEF-456", "GHI-789", "JKL-012"];
console.log("=== Flota de Buses ===");
console.log(`Total de buses: ${placasBuses.length}`);
placasBuses.forEach((placa, i) => {
    console.log(`  ${i + 1}. Bus ${placa}`);
});

// --- Arreglo tipado de numbers: tarifas ---
let tarifas: number[] = [2500, 3000, 3500, 4000];
console.log("\n=== Tarifas por Tipo de Ruta ===");
tarifas.forEach((tarifa, i) => {
    console.log(`  Ruta ${i + 1}: $${tarifa}`);
});

// --- Arreglo tipado de booleans: estados ---
let busesActivos: boolean[] = [true, false, true, true, false];
let activos = busesActivos.filter(b => b).length;
console.log(`\n=== Estado de Flota ===`);
console.log(`Buses activos: ${activos}/${busesActivos.length}`);

// --- Arreglo de tuplas: datos de buses ---
let fleetData: [string, number, boolean][] = [
    ["ABC-123", 40, true],
    ["DEF-456", 50, false],
    ["GHI-789", 35, true],
];

console.log("\n=== Datos de Flota ---");
fleetData.forEach(([placa, capacidad, activo]) => {
    console.log(`  ${placa} | Cap: ${capacidad} | ${activo ? "Activo" : "Inactivo"}`);
});

// --- Métodos de arreglos ---
console.log("\n--- Métodos de Arreglos ---");

let paradas: string[] = ["Terminal", "Plaza", "Hospital", "Universidad", "Aeropuerto"];

console.log(`Original: [${paradas}]`);
console.log(`Reverso: [${[...paradas].reverse()}]`);
console.log(`Slice (1-3): [${paradas.slice(1, 3)}]`);

paradas.push("Mall");
console.log(`Después de push: [${paradas}]`);

paradas.pop();
console.log(`Después de pop: [${paradas}]`);

// --- Arreglos con tipo Array<T> ---
let coordenadasParadas: Array<{nombre: string; lat: number; lng: number}> = [
    { nombre: "Terminal", lat: 4.7109, lng: -74.0720 },
    { nombre: "Plaza", lat: 4.6097, lng: -74.0817 },
    { nombre: "Hospital", lat: 4.6321, lng: -74.0657 },
];

console.log("\n--- Coordenadas de Paradas ---");
coordenadasParadas.forEach(p => {
    console.log(`  ${p.nombre}: (${p.lat}, ${p.lng})`);
});

// --- Arreglos readonly ---
const DIAS_OPERACION: readonly string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
console.log(`\nDías de operación: ${DIAS_OPERACION.join(", ")}`);
// DIAS_OPERACION.push("Domingo"); // Error: Property 'push' does not exist on type 'readonly string[]'

// --- Arreglos multidimensionales ---
let matrizParadas: string[][] = [
    ["Ruta 1", "Terminal", "Plaza", "Norte"],
    ["Ruta 2", "Terminal", "Sur", "Aeropuerto"],
    ["Ruta 3", "Terminal", "Este", "Hospital"],
];

console.log("\n--- Mapa de Rutas ---");
matrizParadas.forEach(ruta => {
    console.log(`  ${ruta[0]}: ${ruta.slice(1).join(" → ")}`);
});
