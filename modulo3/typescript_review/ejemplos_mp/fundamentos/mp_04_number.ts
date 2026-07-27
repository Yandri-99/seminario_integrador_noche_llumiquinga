// ============================================
// MP_04: Numbers - Distancias, Velocidades y Tarifas
// ============================================

// --- Números básicos ---
let distanciaRuta: number = 15.5;       // kilómetros
let velocidadBus: number = 45;          // km/h
let tarifaBasica: number = 2500;        // pesos
let nivelCombustible: number = 85.5;    // porcentaje
let pasajerosAbordo: number = 32;       // cantidad

console.log("=== Datos del Bus ===");
console.log(`Distancia de la ruta: ${distanciaRuta} km`);
console.log(`Velocidad actual: ${velocidadBus} km/h`);
console.log(`Tarifa básica: $${tarifaBasica}`);
console.log(`Nivel de combustible: ${nivelCombustible}%`);
console.log(`Pasajeros a bordo: ${pasajerosAbordo}`);

// --- Operaciones aritméticas ---
console.log("\n--- Cálculos de Transporte ---");

// Tiempo estimado de viaje (distancia / velocidad)
let tiempoEstimado: number = distanciaRuta / velocidadBus;
console.log(`Tiempo estimado: ${tiempoEstimado.toFixed(2)} horas`);

// Ingresos por pasajeros
let ingresos: number = pasajerosAbordo * tarifaBasica;
console.log(`Ingresos del viaje: $${ingresos.toLocaleString()}`);

// Consumo de combustible (litros por km)
let consumoPorKm: number = 0.35; // litros/km
let combustibleNecesario: number = distanciaRuta * consumoPorKm;
console.log(`Combustible necesario: ${combustibleNecesario.toFixed(2)} litros`);

// --- Métodos de Number ---
console.log("\n--- Métodos de Number ---");

let tarifaConDescuento: number = tarifaBasica * 0.85;
console.log(`Tarifa con descuento: $${tarifaConDescuento.toFixed(0)}`);

let velocidadExacta: number = 45.67891;
console.log(`Velocidad redondeada: ${velocidadExacta.toFixed(1)} km/h`);
console.log(`Velocidad (toPrecision): ${velocidadExacta.toPrecision(3)} km/h`);

let coordenadaLat: number = 4.710989;
let coordenadaLng: number = -74.072092;
console.log(`\nCoordenadas del terminal:`);
console.log(`Lat: ${coordenadaLat.toFixed(6)}`);
console.log(`Lng: ${coordenadaLng.toFixed(6)}`);

// --- Constantes numéricas ---
const LITROS_TANQUE: number = 200;
const VELOCIDAD_MAXIMA: number = 80;
const CAPACIDAD_BUS: number = 40;

console.log("\n--- Límites del Bus ---");
console.log(`Capacidad del tanque: ${LITROS_TANQUE} litros`);
console.log(`Velocidad máxima: ${VELOCIDAD_MAXIMA} km/h`);
console.log(`Capacidad de pasajeros: ${CAPACIDAD_BUS}`);

// Verificar tipos
console.log(`\nTipo de distancia: ${typeof distanciaRuta}`);
console.log(`Tipo de pasajeros: ${typeof pasajerosAbordo}`);
