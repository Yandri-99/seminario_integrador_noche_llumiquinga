// ============================================
// MP_05: Boolean - Estado del Bus y Servicio
// ============================================

// --- Booleans básicos ---
let busActivo: boolean = true;
let aireAcondicionado: boolean = true;
let tieneWifi: boolean = false;
let enMantenimiento: boolean = false;

console.log("=== Estado del Bus ===");
console.log(`Activo: ${busActivo}`);
console.log(`Aire acondicionado: ${aireAcondicionado}`);
console.log(`WiFi disponible: ${tieneWifi}`);
console.log(`En mantenimiento: ${enMantenimiento}`);

// --- Comparaciones que retornan boolean ---
let capacidadBus: number = 40;
let pasajerosActuales: number = 35;

let estaLleno: boolean = pasajerosActuales >= capacidadBus;
let hayEspacio: boolean = pasajerosActuales < capacidadBus;
let estaEnUmbral: boolean = pasajerosActuales === capacidadBus;

console.log("\n--- Verificación de Capacidad ---");
console.log(`Capacidad: ${capacidadBus}, Pasajeros: ${pasajerosActuales}`);
console.log(`¿Está lleno? ${estaLleno}`);
console.log(`¿Hay espacio? ${hayEspacio}`);
console.log(`¿En umbral exacto? ${estaEnUmbral}`);

// --- Uso en condiciones ---
let nivelCombustible: number = 25;
let puedeOperar: boolean = nivelCombustible > 20;

console.log("\n--- Estado de Combustible ---");
console.log(`Nivel: ${nivelCombustible}%`);
console.log(`Puede operar: ${puedeOperar}`);

if (puedeOperar) {
    console.log("✓ Bus listo para salir a ruta");
} else {
    console.log("✗ Bus requiere abastecimiento");
}

// --- Operadores lógicos ---
let conductorDisponible: boolean = true;
let busReparado: boolean = true;
let documentacionVigente: boolean = true;

let puedeSalirARuta: boolean = conductorDisponible && busReparado && documentacionVigente;
console.log("\n--- Verificación de Salida ---");
console.log(`Conductor disponible: ${conductorDisponible}`);
console.log(`Bus reparado: ${busReparado}`);
console.log(`Documentación vigente: ${documentacionVigente}`);
console.log(`Puede salir a ruta: ${puedeSalirARuta}`);

// --- Boolean con igualdad estricta ---
let estadoRuta: string = "activa";
let rutaDisponible: boolean = estadoRuta === "activa";
console.log(`\nRuta "${estadoRuta}" → Disponible: ${rutaDisponible}`);

// --- Conversión a boolean ---
let contadorPasajeros: number = 0;
let hayPasajeros: boolean = Boolean(contadorPasajeros);
console.log(`\nContador: ${contadorPasajeros}, Hay pasajeros: ${hayPasajeros}`);

let mensajeParada: string = "";
let tieneMensaje: boolean = !!mensajeParada; // Double negation
console.log(`Mensaje vacío: "${mensajeParada}", Tiene mensaje: ${tieneMensaje}`);

console.log(`\nTipo de busActivo: ${typeof busActivo}`);
