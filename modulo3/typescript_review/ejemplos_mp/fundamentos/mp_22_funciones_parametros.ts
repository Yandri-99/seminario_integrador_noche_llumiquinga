// ============================================
// MP_22: Funciones con Parámetros - Configuración de Rutas
// ============================================

// --- Parámetros requeridos y opcionales ---
function configurarRuta(
    codigo: string,
    nombre: string,
    distancia: number,
    paradas: number,
    tarifa: number,
    frecuencia?: number,        // opcional
    accesible?: boolean        // opcional
): string {
    let config = `Ruta ${codigo} - ${nombre}\n`;
    config += `  Distancia: ${distancia} km\n`;
    config += `  Paradas: ${paradas}\n`;
    config += `  Tarifa: $${tarifa}\n`;
    config += `  Frecuencia: ${frecuencia ?? 15} min\n`;
    config += `  Accesible: ${accesible ?? true ? "Sí" : "No"}`;
    return config;
}

console.log("=== Configuración de Rutas ===");
console.log(configurarRuta("RT-01", "Centro-Norte", 15.5, 8, 2500));
console.log();
console.log(configurarRuta("RT-02", "Express Sur", 22, 5, 3500, 10, false));

// --- Parámetros con valores por defecto ---
function crearBus(
    placa: string,
    capacidad: number = 40,
    tipo: string = "estándar",
    combustible: number = 100,
    aire: boolean = true
): void {
    console.log(`\n--- Nuevo Bus ---`);
    console.log(`Placa: ${placa}`);
    console.log(`Capacidad: ${capacidad}`);
    console.log(`Tipo: ${tipo}`);
    console.log(`Combustible: ${combustible}%`);
    console.log(`Aire acondicionado: ${aire ? "Sí" : "No"}`);
}

console.log("\n--- Crear Buses ---");
crearBus("ABC-123");
crearBus("DEF-456", 50, "articulado", 85);
crearBus("GHI-789", 20, "minibús", 95, false);

// --- Parámetros de objeto destructuring ---
function registrarConductor({
    nombre,
    licencia,
    telefono,
    turno,
    experiencia
}: {
    nombre: string;
    licencia: string;
    telefono?: string;
    turno: string;
    experiencia: number;
}): void {
    console.log(`\n--- Conductor Registrado ---`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Licencia: ${licencia}`);
    console.log(`Teléfono: ${telefono ?? "No proporcionado"}`);
    console.log(`Turno: ${turno}`);
    console.log(`Experiencia: ${experiencia} años`);
}

registrarConductor({
    nombre: "Carlos Mendoza",
    licencia: "B2-12345",
    turno: "Diurno",
    experiencia: 8
});

registrarConductor({
    nombre: "Ana Ruiz",
    licencia: "B2-67890",
    telefono: "300-123-4567",
    turno: "Nocturno",
    experiencia: 5
});

// --- Parámetros rest: múltiples paradas ---
function planificarRuta(codigo: string, ...paradas: string[]): void {
    console.log(`\n--- Planificación de ${codigo} ---`);
    paradas.forEach((parada, i) => {
        if (i === 0) {
            console.log(`  INICIO: ${parada}`);
        } else if (i === paradas.length - 1) {
            console.log(`  FIN: ${parada}`);
        } else {
            console.log(`  ${i}. ${parada}`);
        }
    });
}

planificarRuta("RT-05", "Terminal", "Plaza", "Hospital", "Universidad", "Aeropuerto");
planificarRuta("RT-08", "Centro", "Norte");

// --- Parámetros tipo spread ---
function calcularIngresos(...viajes: { pasajeros: number; tarifa: number }[]): number {
    return viajes.reduce((total, v) => total + (v.pasajeros * v.tarifa), 0);
}

let totalIngresos = calcularIngresos(
    { pasajeros: 32, tarifa: 2500 },
    { pasajeros: 28, tarifa: 2500 },
    { pasajeros: 35, tarifa: 3000 }
);

console.log(`\n--- Ingresos del Día ---`);
console.log(`Total: $${totalIngresos.toLocaleString()}`);

// --- Callback como parámetro ---
function ejecutarAccion(
    accion: string,
    callback: (mensaje: string) => void
): void {
    callback(`Ejecutando: ${accion}`);
}

console.log("\n--- Acciones del Bus ---");
ejecutarAccion("abrir puertas", (msg) => console.log(`  🚪 ${msg}`));
ejecutarAccion("iniciar motor", (msg) => console.log(`  🚌 ${msg}`));
ejecutarAccion("cerrar puertas", (msg) => console.log(`  🚪 ${msg}`));
