// ============================================
// MP_17: forEach/map - Procesamiento de Pasajeros
// ============================================

// --- forEach: iterar pasajeros ---
let pasajeros: { nombre: string; destino: string; pagado: boolean }[] = [
    { nombre: "Ana García", destino: "Hospital", pagado: true },
    { nombre: "Luis Pérez", destino: "Universidad", pagado: false },
    { nombre: "María López", destino: "Plaza", pagado: true },
    { nombre: "Pedro Ruiz", destino: "Aeropuerto", pagado: true },
    { nombre: "Laura Sánchez", destino: "Terminal", pagado: false }
];

console.log("=== Lista de Pasajeros ===");
pasajeros.forEach((pasajero, index) => {
    const estado = pasajero.pagado ? "✓" : "✗";
    console.log(`  ${index + 1}. ${estado} ${pasajero.nombre} → ${pasajero.destino}`);
});

// --- map: transformar datos ---
console.log("\n--- Nombres Formateados ---");
let nombresFormateados: string[] = pasajeros.map(p => {
    const partes = p.nombre.split(" ");
    return `${partes[0]} ${partes[1]?.charAt(0) || ""}.`;
});
nombresFormateados.forEach(nombre => console.log(`  ${nombre}`));

// --- map: crear resumen de viaje ---
let resumenViaje: { pasajero: string; destino: string }[] = pasajeros
    .filter(p => p.pagado)
    .map(p => ({
        pasajero: p.nombre,
        destino: p.destino
    }));

console.log("\n--- Pasajeros con Pago Confirmado ---");
resumenViaje.forEach(r => {
    console.log(`  ${r.pasajero} → ${r.destino}`);
});

// --- forEach:统计 ---
let totalPagado: number = 0;
let totalPendiente: number = 0;
const tarifa: number = 2500;

pasajeros.forEach(p => {
    if (p.pagado) {
        totalPagado += tarifa;
    } else {
        totalPendiente += tarifa;
    }
});

console.log("\n--- Resumen de Ingresos ---");
console.log(`  Cobrado: $${totalPagado.toLocaleString()}`);
console.log(`  Pendiente: $${totalPendiente.toLocaleString()}`);
console.log(`  Total esperado: $${(totalPagado + totalPendiente).toLocaleString()}`);

// --- map: coordenadas de destinos ---
let destinos: string[] = ["Hospital", "Universidad", "Plaza", "Aeropuerto", "Terminal"];
let coordenadasDestinos: { destino: string; lat: number; lng: number }[] = destinos.map(d => ({
    destino: d,
    lat: 4.7 + Math.random() * 0.1,
    lng: -74.07 + Math.random() * 0.1
}));

console.log("\n--- Coordenadas de Destinos ---");
coordenadasDestinos.forEach(c => {
    console.log(`  ${c.destino}: (${c.lat.toFixed(4)}, ${c.lng.toFixed(4)})`);
});

// --- forEach: registrar eventos ---
let eventos: string[] = [
    "Bus inició ruta",
    "Parada en Hospital - 5 subieron",
    "Parada en Plaza - 3 bajaron",
    "Alerta: tráfico alto",
    "Parada en Universidad - 8 subieron"
];

console.log("\n--- Registro de Eventos ---");
eventos.forEach((evento, i) => {
    let hora: string = `${7 + i}:00`;
    console.log(`  [${hora}] ${evento}`);
});

// --- map con filter: pasajeros que pagan ---
console.log("\n--- Destinos con Pago ---");
let destinosConPago: string[] = pasajeros
    .filter(p => p.pagado)
    .map(p => p.destino);
console.log(`  Destinos: ${destinosConPago.join(", ")}`);

// --- forEach: actualizar datos ---
let buses: { placa: string; kilometraje: number }[] = [
    { placa: "ABC-123", kilometraje: 125000 },
    { placa: "DEF-456", kilometraje: 98000 },
    { placa: "GHI-789", kilometraje: 203000 }
];

console.log("\n--- Actualización de Kilometraje ---");
buses.forEach(bus => {
    bus.kilometraje += 150; // Agregar 150 km por viaje
    console.log(`  ${bus.placa}: ${bus.kilometraje} km`);
});
