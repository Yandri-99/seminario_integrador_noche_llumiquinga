// ============================================
// MP: Presentación del Sistema de Transporte
// ============================================

// --- Datos de la empresa ---
const NOMBRE_EMPRESA: string = "TransMunicipio S.A.S.";
const NIT: string = "900.123.456-7";
const ANIO_FUNDACION: number = 1998;
const MISION: string = "Brindar servicio de transporte público seguro, eficiente y accesible para todos los ciudadanos.";

// --- Datos de la flota ---
let totalBuses: number = 45;
let busesActivos: number = 38;
let totalRutas: number = 12;
let totalConductores: number = 52;

// --- Información del sistema ---
let sistema: {
    nombre: string;
    version: string;
    fechaLanzamiento: Date;
    modulos: string[];
} = {
    nombre: "Sistema de Gestión de Transporte",
    version: "2.5.0",
    fechaLanzamiento: new Date(2024, 0, 15),
    modulos: [
        "Gestión de Buses",
        "Control de Rutas",
        "Administración de Conductores",
        "Registro de Pasajeros",
        "Facturación",
        "Reportes"
    ]
};

// --- Funciones de presentación ---
function mostrarBanner(): void {
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║     SISTEMA DE GESTIÓN DE TRANSPORTE PÚBLICO    ║");
    console.log("║              TransMunicipio S.A.S.               ║");
    console.log("╚══════════════════════════════════════════════════╝");
}

function mostrarEmpresa(): void {
    console.log("\n=== Información de la Empresa ===");
    console.log(`  Nombre: ${NOMBRE_EMPRESA}`);
    console.log(`  NIT: ${NIT}`);
    console.log(`  Año de fundación: ${ANIO_FUNDACION}`);
    console.log(`  Misión: ${MISION}`);
}

function mostrarFlota(): void {
    console.log("\n=== Estado de la Flota ===");
    console.log(`  Total de buses: ${totalBuses}`);
    console.log(`  Buses activos: ${busesActivos}`);
    console.log(`  Buses inactivos: ${totalBuses - busesActivos}`);
    console.log(`  Rutas operativas: ${totalRutas}`);
    console.log(`  Conductores: ${totalConductores}`);
}

function mostrarSistema(): void {
    console.log("\n=== Información del Sistema ===");
    console.log(`  Sistema: ${sistema.nombre}`);
    console.log(`  Versión: ${sistema.version}`);
    console.log(`  Lanzamiento: ${sistema.fechaLanzamiento.toLocaleDateString()}`);
    console.log(`  Módulos (${sistema.modulos.length}):`);
    sistema.modulos.forEach((modulo, i) => {
        console.log(`    ${i + 1}. ${modulo}`);
    });
}

function mostrarEstadisticas(): void {
    let horasOperacion: number = 18;
    let diasOperacion: number = 365;
    let pasajerosDiarios: number = 15000;
    
    console.log("\n=== Estadísticas Anuales ===");
    console.log(`  Horas de operación/día: ${horasOperacion}`);
    console.log(`  Días de operación/año: ${diasOperacion}`);
    console.log(`  Pasajeros promedio/día: ${pasajerosDiarios.toLocaleString()}`);
    console.log(`  Pasajeros anuales estimados: ${(pasajerosDiarios * diasOperacion).toLocaleString()}`);
}

// --- Ejecución ---
mostrarBanner();
mostrarEmpresa();
mostrarFlota();
mostrarSistema();
mostrarEstadisticas();

console.log("\n=== Bienvenido al Sistema ===");
console.log("Sistema listo para operar.");
