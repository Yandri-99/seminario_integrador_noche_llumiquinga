// ============================================
// MP_19: Break - Búsqueda de un Bus
// ============================================

// --- Break en for: buscar bus por placa ---
let buses: { placa: string; ruta: string; activo: boolean }[] = [
    { placa: "ABC-123", ruta: "Ruta 1", activo: true },
    { placa: "DEF-456", ruta: "Ruta 2", activo: false },
    { placa: "GHI-789", ruta: "Ruta 3", activo: true },
    { placa: "JKL-012", ruta: "Ruta 4", activo: true },
    { placa: "MNO-345", ruta: "Ruta 5", activo: false },
];

console.log("=== Búsqueda de Bus por Placa ===");
let placaBuscada: string = "GHI-789";
let encontrado: boolean = false;

for (let i = 0; i < buses.length; i++) {
    console.log(`  Buscando en posición ${i}: ${buses[i].placa}`);
    
    if (buses[i].placa === placaBuscada) {
        console.log(`  ✓ ¡Encontrado! Bus ${buses[i].placa} en ${buses[i].ruta}`);
        encontrado = true;
        break;
    }
}

if (!encontrado) {
    console.log(`  ✗ Bus ${placaBuscada} no encontrado en la flota`);
}

// --- Break en while: primer bus con combustible crítico ---
let busesConCombustible: { placa: string; combustible: number }[] = [
    { placa: "ABC-123", combustible: 75 },
    { placa: "DEF-456", combustible: 45 },
    { placa: "GHI-789", combustible: 15 },
    { placa: "JKL-012", combustible: 80 },
];

console.log("\n--- Buscando Bus con Combustible Crítico ---");
let indice: number = 0;

while (indice < busesConCombustible.length) {
    if (busesConCombustible[indice].combustible < 20) {
        console.log(`  ⚠ ¡Encontrado! ${busesConCombustible[indice].placa} con ${busesConCombustible[indice].combustible}%`);
        break;
    }
    indice++;
}

// --- Break en for-of: buscar parada ---
let paradas: string[] = ["Terminal", "Plaza", "Hospital", "Universidad", "Aeropuerto", "Mall"];
let paradaBuscada: string = "Hospital";

console.log("\n--- Buscando Parada en Ruta ---");
for (const [indice, parada] of paradas.entries()) {
    if (parada === paradaBuscada) {
        console.log(`  ✓ Parada "${parada}" encontrada en posición ${indice + 1}`);
        break;
    }
}

// --- Break con labels: búsqueda en matriz ---
let matrizRutas: string[][] = [
    ["Bus A", "Terminal", "Plaza"],
    ["Bus B", "Hospital", "Universidad"],
    ["Bus C", "Aeropuerto", "Mall"]
];

let busBuscado: string = "Bus B";
let paradaBuscada2: string = "Universidad";

console.log("\n--- Búsqueda en Matriz de Rutas ---");
let salir: boolean = false;

for (let i = 0; i < matrizRutas.length; i++) {
    for (let j = 1; j < matrizRutas[i].length; j++) {
        if (matrizRutas[i][j] === paradaBuscada2) {
            console.log(`  ✓ ${busBuscado} pasa por "${paradaBuscada2}" en ruta ${i + 1}`);
            salir = true;
            break;
        }
    }
    if (salir) break;
}

// --- Break en búsqueda de conductor ---
let conductores: { nombre: string; disponible: boolean; turno: string }[] = [
    { nombre: "Carlos", disponible: false, turno: "Mañana" },
    { nombre: "María", disponible: true, turno: "Tarde" },
    { nombre: "Pedro", disponible: false, turno: "Noche" },
    { nombre: "Laura", disponible: true, turno: "Mañana" },
];

console.log("\n--- Buscando Conductor Disponible ---");
for (const conductor of conductores) {
    if (conductor.disponible) {
        console.log(`  ✓ Conductor encontrado: ${conductor.nombre} (Turno: ${conductor.turno})`);
        break;
    }
}

// --- Break con continue: encontrar primer bus activo ---
let flota: { placa: string; activo: boolean; kilometraje: number }[] = [
    { placa: "ABC-123", activo: false, kilometraje: 50000 },
    { placa: "DEF-456", activo: true, kilometraje: 120000 },
    { placa: "GHI-789", activo: true, kilometraje: 80000 },
];

console.log("\n--- Primer Bus Activo con Mayor Kilometraje ---");
let mejorBus = flota[0];

for (const bus of flota) {
    if (!bus.activo) continue;
    
    if (bus.kilometraje > mejorBus.kilometraje) {
        mejorBus = bus;
    }
}

console.log(`  Bus: ${mejorBus.placa}`);
console.log(`  Kilometraje: ${mejorBus.kilometraje} km`);
