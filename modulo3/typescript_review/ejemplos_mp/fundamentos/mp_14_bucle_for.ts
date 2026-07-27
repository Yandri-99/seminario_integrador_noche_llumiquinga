// ============================================
// MP_14: Bucle For - Paradas del Bus
// ============================================

// --- For clásico: listar paradas ---
let paradas: string[] = [
    "Terminal Central",
    "Plaza Mayor",
    "Hospital General",
    "Universidad",
    "Centro Comercial",
    "Aeropuerto"
];

console.log("=== Recorrido del Bus ===");
console.log(`Total de paradas: ${paradas.length}`);
console.log();

for (let i = 0; i < paradas.length; i++) {
    console.log(`  ${i + 1}. ${paradas[i]}`);
    if (i < paradas.length - 1) {
        console.log(`     ↳ Próxima parada: ${paradas[i + 1]}`);
    }
}

// --- For con cálculos: distancias ---
console.log("\n--- Distancias entre Paradas ---");
let distancias: number[] = [0, 2.5, 4.8, 7.2, 10.1, 15.3];
let distanciaTotal: number = 0;

for (let i = 0; i < distancias.length - 1; i++) {
    let tramo: number = distancias[i + 1] - distancias[i];
    distanciaTotal += tramo;
    console.log(`  ${paradas[i]} → ${paradas[i + 1]}: ${tramo} km`);
}
console.log(`  Distancia total: ${distanciaTotal} km`);

// --- For con condicional: buses en servicio ---
let buses: { placa: string; activo: boolean; combustible: number }[] = [
    { placa: "ABC-123", activo: true, combustible: 85 },
    { placa: "DEF-456", activo: false, combustible: 45 },
    { placa: "GHI-789", activo: true, combustible: 20 },
    { placa: "JKL-012", activo: true, combustible: 90 },
    { placa: "MNO-345", activo: false, combustible: 60 },
];

console.log("\n--- Verificación de Flota ---");
let busesOperativos: number = 0;
let busesNecesitanCombustible: number = 0;

for (let i = 0; i < buses.length; i++) {
    if (buses[i].activo) {
        busesOperativos++;
        console.log(`  ${buses[i].placa}: ${buses[i].combustible}% combustible`);
        if (buses[i].combustible < 25) {
            busesNecesitanCombustible++;
            console.log(`    ⚠ ¡Necesita combustible!`);
        }
    }
}

console.log(`\n  Buses operativos: ${busesOperativos}/${buses.length}`);
console.log(`  Buses sin combustible: ${busesNecesitanCombustible}`);

// --- For con步进步数: horarios ---
console.log("\n--- Horarios de Salida ---");
let horaInicio: number = 5;
let horaFin: number = 22;
let intervalo: number = 2;

for (let hora = horaInicio; hora <= horaFin; hora += intervalo) {
    let periodo: string = hora < 12 ? "AM" : "PM";
    let horaFormato: number = hora > 12 ? hora - 12 : hora;
    console.log(`  ${horaFormato}:00 ${periodo}`);
}

// --- For anidado: matriz de horarios ---
console.log("\n--- Horarios por Día ---");
let dias: string[] = ["Lunes", "Martes", "Miércoles"];
let turnos: string[] = ["Mañana", "Tarde", "Noche"];

for (let i = 0; i < dias.length; i++) {
    console.log(`  ${dias[i]}:`);
    for (let j = 0; j < turnos.length; j++) {
        console.log(`    - ${turnos[j]}: ${5 + j * 6}:00 - ${11 + j * 6}:00`);
    }
}

// --- For reverso: desembarque ---
console.log("\n--- Secuencia de Desembarque ---");
let pasajeros: string[] = ["Ana", "Luis", "María", "Pedro", "Laura"];

for (let i = pasajeros.length - 1; i >= 0; i--) {
    console.log(`  ${pasajeros[i]} desciende del bus`);
}
