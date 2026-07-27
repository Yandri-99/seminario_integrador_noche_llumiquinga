// ============================================
// MP_01: Hello TypeScript - Gestión de Transporte Público
// ============================================

// Mensaje de bienvenida al sistema de gestión de transporte
let mensaje: string = "¡Bienvenido al Sistema de Gestión de Transporte Público!";
console.log(mensaje);

// Información básica del sistema
let version: string = "1.0.0";
let empresa: string = "TransMunicipio S.A.S.";
console.log(`Sistema ${empresa} - Versión ${version}`);
console.log("Gestión de buses, rutas, conductores y pasajeros.");

// Variables con tipos explícitos
let totalBuses: number = 45;
let totalRutas: number = 12;
let estaActivo: boolean = true;

console.log(`Buses en flota: ${totalBuses}`);
console.log(`Rutas disponibles: ${totalRutas}`);
console.log(`Sistema activo: ${estaActivo}`);
