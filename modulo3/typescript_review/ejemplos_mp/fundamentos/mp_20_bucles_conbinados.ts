// ============================================
// MP_20: Bucles Combinados - Horarios de Buses
// ============================================

// --- For anidado: horarios por ruta ---
let rutas: string[] = ["Ruta 1 - Norte", "Ruta 2 - Sur", "Ruta 3 - Este"];
let horasSalida: number[] = [6, 8, 10, 12, 14, 16, 18, 20];

console.log("=== Horarios de Todas las Rutas ===");
for (const ruta of rutas) {
    console.log(`\n  ${ruta}:`);
    for (const hora of horasSalida) {
        let periodo: string = hora >= 12 ? "PM" : "AM";
        let horaFormato: number = hora > 12 ? hora - 12 : hora;
        console.log(`    ${horaFormato}:00 ${periodo}`);
    }
}

// --- For-of con forEach: processar datos ---
let flota: { ruta: string; buses: string[] }[] = [
    { ruta: "Ruta 1", buses: ["ABC-123", "DEF-456"] },
    { ruta: "Ruta 2", buses: ["GHI-789", "JKL-012"] },
    { ruta: "Ruta 3", buses: ["MNO-345"] }
];

console.log("\n--- Asignación de Buses a Rutas ---");
for (const { ruta, buses } of flota) {
    console.log(`  ${ruta}:`);
    buses.forEach((bus, i) => {
        console.log(`    Bus ${i + 1}: ${bus}`);
    });
}

// --- For con while: distribución de pasajeros ---
let asientosDisponibles: number[] = [40, 40, 40];
let pasajerosEsperando: number = 95;

console.log(`\n--- Distribución de ${pasajerosEsperando} Pasajeros ---`);

for (let i = 0; i < asientosDisponibles.length && pasajerosEsperando > 0; i++) {
    let asientos: number = asientosDisponibles[i];
    let abordando: number = Math.min(asientos, pasajerosEsperando);

    console.log(`  Bus ${i + 1}: ${abordando} pasajeros abordan (${asientos - abordando} asientos libres)`);
    pasajerosEsperando -= abordando;
    asientosDisponibles[i] -= abordando;
}

if (pasajerosEsperando > 0) {
    console.log(`  ⚠ ${pasajerosEsperando} pasajeros sin asiento`);
}

// --- For con break: buscar en múltiples rutas ---
let busEnRutas: { ruta: string; paradas: string[] }[] = [
    { ruta: "Ruta 1", paradas: ["Terminal", "Plaza", "Norte"] },
    { ruta: "Ruta 2", paradas: ["Terminal", "Sur", "Aeropuerto"] },
    { ruta: "Ruta 3", paradas: ["Terminal", "Este", "Hospital"] }
];

let paradaBuscada: string = "Hospital";

console.log("\n--- Buscando Ruta con Parada Específica ---");
for (const { ruta, paradas } of busEnRutas) {
    for (const parada of paradas) {
        if (parada === paradaBuscada) {
            console.log(`  ✓ ${ruta} pasa por "${paradaBuscada}"`);
            break;
        }
    }
}

// --- Map con filter: estadísticas ---
let viajesDiarios: { ruta: string; pasajeros: number; ingresos: number }[] = [
    { ruta: "Ruta 1", pasajeros: 320, ingresos: 800000 },
    { ruta: "Ruta 2", pasajeros: 280, ingresos: 700000 },
    { ruta: "Ruta 3", pasajeros: 350, ingresos: 875000 },
    { ruta: "Ruta 4", pasajeros: 200, ingresos: 500000 },
];

console.log("\n--- Rutas Rentables (>250 pasajeros) ---");
viajesDiarios
    .filter(v => v.pasajeros > 250)
    .forEach(v => {
        console.log(`  ${v.ruta}: ${v.pasajeros} pasajeros - $${v.ingresos.toLocaleString()}`);
    });

// --- Combinar for con condicional ---
let HorariosSemana: { dia: string; horas: number[] }[] = [
    { dia: "Lunes", horas: [6, 8, 10, 12, 14, 16, 18, 20] },
    { dia: "Sábado", horas: [7, 9, 11, 14, 17] },
    { dia: "Domingo", horas: [8, 11, 15] }
];

console.log("\n--- Horarios por Día ---");
for (const { dia, horas } of HorariosSemana) {
    console.log(`  ${dia} (${horas.length} servicios):`);
    horas.forEach(h => {
        let periodo: string = h >= 12 ? "PM" : "AM";
        let h12: number = h > 12 ? h - 12 : h;
        process.stdout.write(`    ${h12}:00${periodo} `);
    });
    console.log();
}

// --- Reducción con for ---
let ventasPasajes: number[] = [45, 52, 38, 67, 41, 55, 48];
let totalVentas: number = 0;

for (const venta of ventasPasajes) {
    totalVentas += venta;
}

console.log(`\n--- Resumen Semanal ---`);
console.log(`  Total pasajes vendidos: ${totalVentas}`);
console.log(`  Promedio diario: ${(totalVentas / ventasPasajes.length).toFixed(1)}`);
console.log(`  Día con más ventas: ${Math.max(...ventasPasajes)}`);
console.log(`  Día con menos ventas: ${Math.min(...ventasPasajes)}`);
