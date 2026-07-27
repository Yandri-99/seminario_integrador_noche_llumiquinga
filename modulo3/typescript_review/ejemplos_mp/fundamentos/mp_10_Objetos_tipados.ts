// ============================================
// MP_10: Objetos Tipados - Datos de Bus y Ruta
// ============================================

// --- Objeto tipado con tipo explícito ---
let bus1: { placa: string; capacidad: number; ruta: string; activo: boolean } = {
    placa: "ABC-123",
    capacidad: 40,
    ruta: "Ruta 5 - Centro",
    activo: true
};

console.log("=== Datos del Bus ===");
console.log(`Placa: ${bus1.placa}`);
console.log(`Capacidad: ${bus1.capacidad} pasajeros`);
console.log(`Ruta: ${bus1.ruta}`);
console.log(`Activo: ${bus1.activo}`);

// --- Objeto con tipos mixtos ---
let rutaInfo: {
    codigo: string;
    nombre: string;
    distancia: number;
    paradas: number;
    tarifa: number;
} = {
    codigo: "RT-05",
    nombre: "Centro - Norte",
    distancia: 15.5,
    paradas: 8,
    tarifa: 2500
};

console.log("\n=== Información de Ruta ===");
console.log(`Código: ${rutaInfo.codigo}`);
console.log(`Nombre: ${rutaInfo.nombre}`);
console.log(`Distancia: ${rutaInfo.distancia} km`);
console.log(`Paradas: ${rutaInfo.paradas}`);
console.log(`Tarifa: $${rutaInfo.tarifa}`);

// --- Objeto con propiedades opcionales ---
let conductor: {
    nombre: string;
    licencia: string;
    telefono?: string;  // opcional
    email?: string;     // opcional
} = {
    nombre: "Carlos Mendoza",
    licencia: "B2-12345"
};

console.log("\n=== Datos del Conductor ===");
console.log(`Nombre: ${conductor.nombre}`);
console.log(`Licencia: ${conductor.licencia}`);
console.log(`Teléfono: ${conductor.telefono ?? "No registrado"}`);
console.log(`Email: ${conductor.email ?? "No registrado"}`);

// --- Objeto con readonly ---
let coordinador: {
    readonly nombre: string;
    readonly turno: string;
    rutasAsignadas: number;
} = {
    nombre: "Ana Ruiz",
    turno: "Diurno",
    rutasAsignadas: 3
};

console.log("\n=== Coordinador ===");
console.log(`Nombre: ${coordinador.nombre}`);
console.log(`Turno: ${coordinador.turno}`);
console.log(`Rutas asignadas: ${coordinador.rutasAsignadas}`);

// coordinador.nombre = "Otro"; // Error: Cannot assign to 'nombre' because it is a read-only property
coordinador.rutasAsignadas = 5; // Permitido: no es readonly
console.log(`Rutas actualizadas: ${coordinador.rutasAsignadas}`);

// --- Arreglo de objetos ---
let flota: { placa: string; capacidad: number; enServicio: boolean }[] = [
    { placa: "ABC-123", capacidad: 40, enServicio: true },
    { placa: "DEF-456", capacidad: 50, enServicio: false },
    { placa: "GHI-789", capacidad: 35, enServicio: true },
];

console.log("\n=== Flota Completa ---");
flota.forEach(bus => {
    const estado = bus.enServicio ? "🟢 En servicio" : "🔴 Fuera de servicio";
    console.log(`  ${bus.placa} | Cap: ${bus.capacidad} | ${estado}`);
});

// --- Modificación de objetos ---
let parada: { nombre: string; coordenadas: { lat: number; lng: number } } = {
    nombre: "Plaza Central",
    coordenadas: { lat: 4.7109, lng: -74.0720 }
};

console.log(`\nParada: ${parada.nombre}`);
console.log(`Lat: ${parada.coordenadas.lat}, Lng: ${parada.coordenadas.lng}`);

// Modificar objeto anidado
parada.coordenadas.lat = 4.7115;
console.log(`Coordenadas actualizadas: (${parada.coordenadas.lat}, ${parada.coordenadas.lng})`);
