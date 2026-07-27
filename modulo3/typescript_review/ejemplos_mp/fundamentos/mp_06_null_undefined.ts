// ============================================
// MP_06: Null y Undefined - Asignación Opcional de Conductores
// ============================================

// --- Null: ausencia intencional de valor ---
let conductorAsignado: string | null = "Carlos Mendoza";
console.log(`Conductor asignado: ${conductorAsignado}`);

conductorAsignado = null; // No hay conductor asignado
console.log(`Sin conductor: ${conductorAsignado}`);

// --- Undefined: variable sin valor ---
let segundoConductor: string | undefined;
console.log(`\nSegundo conductor: ${segundoConductor}`);
console.log(`Tipo: ${typeof segundoConductor}`);

// --- Diferencia entre null y undefined ---
let paradaActual: string | null = "Plaza Central";
let proximaParada: string | undefined;

console.log("\n--- Diferencia null vs undefined ---");
console.log(`paradaActual (null): ${paradaActual}`);
console.log(`proximaParada (undefined): ${proximaParada}`);
console.log(`typeof paradaActual: ${typeof paradaActual}`);
console.log(`typeof proximaParada: ${typeof proximaParada}`);

// --- Verificación de null ---
let conductorTurnoManana: string | null = "María López";
let conductorTurnoNoche: string | null = null;

console.log("\n--- Turnos de Conductores ---");
console.log(`Turno mañana: ${conductorTurnoManana}`);
console.log(`Turno noche: ${conductorTurnoNoche}`);

if (conductorTurnoManana !== null) {
    console.log(`✓ Turno mañana cubierto por: ${conductorTurnoManana}`);
}

if (conductorTurnoNoche === null) {
    console.log("✗ Turno noche SIN cubrir - ¡Se necesita conductor!");
}

// --- Verificación de undefined ---
let busReemplazo: string | undefined;

console.log("\n--- Bus de Reemplazo ---");
if (busReemplazo === undefined) {
    console.log("No hay bus de reemplazo disponible");
}

// --- Parámetros opcionales con null/undefined ---
function asignarConductor(nombre: string | null): string {
    if (nombre === null) {
        return "Sin conductor asignado";
    }
    return `Conductor: ${nombre}`;
}

console.log("\n" + asignarConductor("Pedro García"));
console.log(asignarConductor(null));

// --- Uso práctico: sistema de rutas ---
let paradas: (string | null)[] = [
    "Terminal",
    "Plaza Mayor",
    null,          // Parada temporalmente cerrada
    "Hospital",
    null,          // Parada suspendida por obras
    "Universidad"
];

console.log("\n--- Recorrido de la Ruta ---");
paradas.forEach((parada, index) => {
    if (parada === null) {
        console.log(`${index + 1}. [Parada cerrada/suspendida]`);
    } else {
        console.log(`${index + 1}. ${parada}`);
    }
});
