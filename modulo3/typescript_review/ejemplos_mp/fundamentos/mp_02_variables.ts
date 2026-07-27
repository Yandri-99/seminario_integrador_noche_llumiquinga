// ============================================
// MP_02: Variables - Datos de Buses y Transporte
// ============================================

// --- let: переменные que pueden меняться ---
// let permite reasignar valores

let placaBus: string = "ABC-123";
let capacidadBus: number = 40;
let rutaAsignada: string = "Ruta 5 - Centro";
let enServicio: boolean = true;

console.log(`Bus: ${placaBus}`);
console.log(`Capacidad: ${capacidadBus} pasajeros`);
console.log(`Ruta: ${rutaAsignada}`);
console.log(`En servicio: ${enServicio}`);

// Reasignación con let
placaBus = "DEF-456";
capacidadBus = 60;
enServicio = false;

console.log("\n--- Después de reasignación ---");
console.log(`Nueva placa: ${placaBus}`);
console.log(`Nueva capacidad: ${capacidadBus} pasajeros`);
console.log(`En servicio: ${enServicio}`);

// --- const: constantes que no cambian ---
// const NO permite reasignación

const PI_TRANSPORTE: number = 3.14159;
const TARIFA_BASE: number = 2500;
const EMPRESA: string = "TransMunicipio";
const MAXIMO_PASAJEROS: number = 100;

console.log("\n--- Datos constantes del sistema ---");
console.log(`Empresa: ${EMPRESA}`);
console.log(`Tarifa base: $${TARIFA_BASE}`);
console.log(`Máximo de pasajeros: ${MAXIMO_PASAJEROS}`);

// Estas líneas generarían error si se descomentaran:
// TARIFA_BASE = 3000; // Error: Cannot assign to 'TARIFA_BASE' because it is a constant
// EMPRESA = "Otra";  // Error: Cannot assign to 'EMPRESA' because it is a constant

// --- Diferencia entre let y const ---

// Caso práctico: reasignar estado del bus
let estadoBus: string = "detenido";
estadoBus = "en movimiento";
estadoBus = "en parada";
console.log(`\nEstado del bus cambia: ${estadoBus}`);

// Caso práctico: capacidad máxima (no cambia)
const CAPACIDAD_MAXIMA: number = 40;
console.log(`Capacidad máxima fija: ${CAPACIDAD_MAXIMA}`);
