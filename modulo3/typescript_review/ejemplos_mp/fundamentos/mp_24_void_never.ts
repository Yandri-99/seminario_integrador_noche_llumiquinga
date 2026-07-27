// ============================================
// MP_24: Void y Never - Ciclo de Vida del Bus
// ============================================

// --- Void: acciones que no retornan valor ---
function iniciarSistema(): void {
    console.log("=== Iniciando Sistema de Transporte ===");
    console.log("Cargando módulos...");
    console.log("Conectando a base de datos...");
    console.log("✓ Sistema listo");
}

function apagarSistema(): void {
    console.log("\n=== Apagando Sistema ===");
    console.log("Guardando datos...");
    console.log("Cerrando conexiones...");
    console.log("✓ Sistema apagado");
}

function registrarEvento(mensaje: string): void {
    console.log(`  [LOG] ${mensaje}`);
}

console.log("--- Acciones Void ---");
iniciarSistema();
registrarEvento("Sistema iniciado correctamente");
apagarSistema();

// --- Never: función que nunca termina ---
function cicloBus(): never {
    console.log("\n--- Ciclo Infinito del Bus ---");
    console.log("El bus opera continuamente...");
    // En producción, esto sería un loop infinito
    // while (true) {
    //     iniciarRuta();
    //     completarRuta();
    //     mantener();
    // }
    throw new Error("Ciclo terminado (simulado)");
}

// --- Never con throw: errores fatales ---
function falloCritico(sistema: string): never {
    console.log(`\n⚠ FALLO CRÍTICO en ${sistema}`);
    console.log("El sistema no puede continuar operando");
    throw new Error(`Fallo crítico: ${sistema}`);
}

// --- Diferencia entre void y never ---
function accionNormal(): void {
    console.log("Esta función termina normalmente");
    // return; // implícito
}

function accionQueLanza(): never {
    throw new Error("Esta función nunca termina");
}

console.log("\n--- Comparación Void vs Never ---");
accionNormal();
try {
    accionQueLanza();
} catch (e) {
    console.log(`  Capturado: ${(e as Error).message}`);
}

// --- Void con callbacks ---
function procesarViaje(
    viaje: { id: number; pasajeros: number },
    onComplete: (resultado: string) => void,
    onError: (error: string) => void
): void {
    if (viaje.pasajeros > 0) {
        onComplete(`Viaje #${viaje.id}: ${viaje.pasajeros} pasajeros procesados`);
    } else {
        onError(`Viaje #${viaje.id}: sin pasajeros`);
    }
}

console.log("\n--- Procesar Viajes ---");
procesarViaje(
    { id: 1, pasajeros: 32 },
    (r) => console.log(`  ✓ ${r}`),
    (e) => console.log(`  ✗ ${e}`)
);

procesarViaje(
    { id: 2, pasajeros: 0 },
    (r) => console.log(`  ✓ ${r}`),
    (e) => console.log(`  ✗ ${e}`)
);

// --- Never con switch exhaustivo ---
type EstadoBus = "detenido" | "en_movimiento" | "mantenimiento";

function manejarEstado(estado: EstadoBus): string {
    switch (estado) {
        case "detenido":
            return "Bus detenido en terminal";
        case "en_movimiento":
            return "Bus en ruta";
        case "mantenimiento":
            return "Bus en taller";
        default:
            const _exhaustivo: never = estado;
            return _exhaustivo;
    }
}

console.log("\n--- Estados del Bus ---");
console.log(manejarEstado("detenido"));
console.log(manejarEstado("en_movimiento"));
console.log(manejarEstado("mantenimiento"));
