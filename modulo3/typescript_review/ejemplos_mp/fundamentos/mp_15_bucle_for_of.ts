// ============================================
// MP_15: Bucle For-Of - Iteración de Rutas
// ============================================

// --- For-of con strings: listar rutas ---
let rutas: string[] = [
    "Ruta 1 - Terminal Norte",
    "Ruta 2 - Terminal Sur",
    "Ruta 3 - Terminal Este",
    "Ruta 4 - Terminal Oeste",
    "Ruta 5 - Centro Histórico"
];

console.log("=== Rutas Disponibles ===");
for (const ruta of rutas) {
    console.log(`  🚌 ${ruta}`);
}

// --- For-of con números: distancias ---
let distancias: number[] = [5.2, 8.7, 12.3, 15.8, 20.1];

console.log("\n--- Distancias de Cada Ruta ---");
let distanciaTotal: number = 0;

for (const distancia of distancias) {
    distanciaTotal += distancia;
    console.log(`  Distancia: ${distancia} km`);
}
console.log(`  Total recorrido: ${distanciaTotal} km`);

// --- For-of con objetos: datos de buses ---
let flota: { placa: string; capacidad: number; activo: boolean }[] = [
    { placa: "ABC-123", capacidad: 40, activo: true },
    { placa: "DEF-456", capacidad: 50, activo: false },
    { placa: "GHI-789", capacidad: 35, activo: true },
];

console.log("\n--- Flota de Buses ---");
for (const bus of flota) {
    const estado = bus.activo ? "🟢" : "🔴";
    console.log(`  ${estado} ${bus.placa} - Cap: ${bus.capacidad}`);
}

// --- For-of con entries: paradas con índice ---
console.log("\n--- Recorrido con Tiempos ---");
let paradas: string[] = ["Terminal", "Plaza", "Hospital", "Universidad"];

for (const [indice, parada] of paradas.entries()) {
    let tiempoEstimado: number = indice * 8;
    console.log(`  ${indice + 1}. ${parada} (${tiempoEstimado} min desde inicio)`);
}

// --- For-of con break: buscar bus ---
console.log("\n--- Buscando Bus Específico ---");
let busBuscado: string = "GHI-789";

for (const bus of flota) {
    if (bus.placa === busBuscado) {
        console.log(`  ✓ Encontrado: ${bus.placa} (Cap: ${bus.capacidad})`);
        break;
    }
}

// --- For-of con condicional: pasajeros VIP ---
let pasajeros: { nombre: string; tipo: string }[] = [
    { nombre: "Ana", tipo: "regular" },
    { nombre: "Luis", tipo: "vip" },
    { nombre: "María", tipo: "regular" },
    { nombre: "Pedro", tipo: "vip" },
];

console.log("\n--- Pasajeros VIP ---");
let contadorVip: number = 0;
for (const pasajero of pasajeros) {
    if (pasajero.tipo === "vip") {
        contadorVip++;
        console.log(`  ⭐ ${pasajero.nombre}`);
    }
}
console.log(`  Total VIP: ${contadorVip}`);

// --- For-of con Map ---
let coordenadas: Map<string, { lat: number; lng: number }> = new Map([
    ["Terminal", { lat: 4.7109, lng: -74.0720 }],
    ["Plaza", { lat: 4.6097, lng: -74.0817 }],
    ["Hospital", { lat: 4.6321, lng: -74.0657 }]
]);

console.log("\n--- Coordenadas de Paradas ---");
for (const [nombre, coords] of coordenadas) {
    console.log(`  ${nombre}: (${coords.lat}, ${coords.lng})`);
}

// --- For-of con Set: líneas únicas ---
let lineas: string[] = ["Línea 1", "Línea 2", "Línea 1", "Línea 3", "Línea 2"];
let lineasUnicas: Set<string> = new Set(lineas);

console.log("\n--- Líneas Únicas ---");
for (const linea of lineasUnicas) {
    console.log(`  ${linea}`);
}
