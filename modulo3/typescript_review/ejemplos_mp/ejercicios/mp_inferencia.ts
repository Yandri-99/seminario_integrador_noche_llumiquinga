// ============================================
// MP: Inferencia de Tipos con Variables de Transporte
// ============================================

// --- TypeScript infiere el tipo automáticamente ---

// Inferencia de string
let nombreEmpresa = "TransMunicipio"; // inferido como string
console.log(`Empresa: ${nombreEmpresa}`);

// Inferencia de number
let capacidadBus = 40; // inferido como number
console.log(`Capacidad: ${capacidadBus}`);

// Inferencia de boolean
let busActivo = true; // inferido como boolean
console.log(`Activo: ${busActivo}`);

// Inferencia de array
let paradas = ["Terminal", "Plaza", "Hospital"]; // inferido como string[]
console.log(`Paradas: ${paradas.join(", ")}`);

// Inferencia de objeto
let bus = {
    placa: "ABC-123",
    capacidad: 40,
    ruta: "Ruta 5"
}; // inferido como { placa: string; capacidad: number; ruta: string }
console.log(`Bus: ${bus.placa}`);

// --- Inferencia con let vs const ---

// const permite inferencia más específica
const TARIFA_BASE = 2500; // inferido como number (literal type)
const ESTADO_ACTIVO = "activo"; // inferido como "activo" (literal type)

console.log(`\n--- Inferencia con const ---`);
console.log(`Tarifa: ${TARIFA_BASE}`);
console.log(`Estado: ${ESTADO_ACTIVO}`);

// let permite inferencia más amplia
let tarifa = 2500; // inferido como number (no literal type)
let estado = "activo"; // inferido como string

console.log(`\n--- Inferencia con let ---`);
console.log(`Tarifa: ${tarifa}`);
console.log(`Estado: ${estado}`);

// --- Inferencia con funciones ---

// TypeScript infiere tipo de retorno
function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number) {
    // Retorna number automáticamente
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2));
}

let distancia = calcularDistancia(4.71, -74.07, 4.60, -74.08);
console.log(`\nDistancia: ${distancia.toFixed(4)}`);

// --- Inferencia con callbacks ---

let paradasLista: string[] = ["Terminal", "Plaza", "Hospital"];

// TypeScript infiere tipo del parámetro del callback
paradasLista.forEach((parada, index) => {
    // parada inferido como string, index como number
    console.log(`  ${index + 1}. ${parada}`);
});

// --- Inferencia con condicionales ---

let nivelCombustible = 75;
let estadoCombustible;

if (nivelCombustible > 50) {
    estadoCombustible = "óptimo"; // inferido como "óptimo"
} else if (nivelCombustible > 20) {
    estadoCombustible = "bajo"; // inferido como "bajo"
} else {
    estadoCombustible = "crítico"; // inferido como "crítico"
}

console.log(`\nCombustible: ${nivelCombustible}% - Estado: ${estadoCombustible}`);

// --- Inferencia con arreglos ---

// Array de objetos inferido
let flota = [
    { placa: "ABC-123", capacidad: 40 },
    { placa: "DEF-456", capacidad: 50 },
    { placa: "GHI-789", capacidad: 35 }
]; // inferido como { placa: string; capacidad: number }[]

flota.forEach(bus => {
    console.log(`  ${bus.placa}: ${bus.capacidad} pasajeros`);
});

// --- Inferencia con Map y Set ---

let coordenadas = new Map<string, { lat: number; lng: number }>();
coordenadas.set("Terminal", { lat: 4.7109, lng: -74.0720 });
coordenadas.set("Plaza", { lat: 4.6097, lng: -74.0817 });

// TypeScript infiere tipos del Map
coordenadas.forEach((coords, nombre) => {
    console.log(`  ${nombre}: (${coords.lat}, ${coords.lng})`);
});

// --- Inferencia con clases ---

class Bus {
    placa: string;
    capacidad: number;
    
    constructor(placa: string, capacidad: number) {
        this.placa = placa;
        this.capacidad = capacidad;
    }
}

let miBus = new Bus("ABC-123", 40); // inferido como Bus
console.log(`\nBus clase: ${miBus.placa} (${miBus.capacidad})`);

// --- Cuándo usar tipos explícitos ---

// Inferencia es suficiente cuando:
// 1. El valor es obvio
let nombre = "Bus 1"; // OK inferir

// 2. El tipo se deduce del contexto
let pasajeros = [1, 2, 3]; // OK inferir como number[]

// Usar tipos explícitos cuando:
// 1. Inicialización posterior
let conductor: string | null = null; // Necesario declarar tipo
conductor = "Carlos";

// 2. Parámetros de función
function buscarBus(placa: string): { placa: string; ruta: string } | undefined {
    return undefined;
}

// 3. Cuando el tipo no es claro
let datos: unknown = "datos del bus";

console.log("\n--- Inferencia Completa ---");
console.log("TypeScript inferió todos los tipos correctamente");
