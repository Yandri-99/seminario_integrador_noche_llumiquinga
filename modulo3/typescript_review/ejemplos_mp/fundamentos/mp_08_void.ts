// ============================================
// MP_08: Void - Acciones del Bus (Sin Retorno)
// ============================================

// --- Función void: no retorna ningún valor ---

function iniciarMotor(): void {
    console.log("Motor del bus iniciado...");
    console.log("Verificando sistemas...");
    console.log("✓ Motor listo");
}

function detenerMotor(): void {
    console.log("Deteniendo motor...");
    console.log("✓ Motor apagado");
}

function abrirPuertas(): void {
    console.log("Abriendo puertas del bus...");
}

function cerrarPuertas(): void {
    console.log("Cerrando puertas del bus...");
}

// --- Ejecutar acciones ---
console.log("=== Secuencia de Salida a Ruta ===");
abrirPuertas();
console.log("Esperando pasajeros...");
console.log("Subiendo pasajeros...");
cerrarPuertas();
iniciarMotor();
console.log("Bus en movimiento...");
detenerMotor();

// --- Void con parámetros ---
function registrarLog(mensaje: string): void {
    const fecha = new Date().toLocaleString();
    console.log(`[${fecha}] LOG: ${mensaje}`);
}

function mostrarAlerta(nivel: string, descripcion: string): void {
    console.log(`⚠ ALERTA [${nivel.toUpperCase()}]: ${descripcion}`);
}

console.log("\n--- Sistema de Logging ---");
registrarLog("Bus ABC-123 inició ruta");
registrarLog("Parada en Hospital - 5 pasajeros subieron");
mostrarAlerta("alta", "Nivel de combustible bajo (15%)");
mostrarAlerta("media", "Retraso de 10 minutos en Ruta 5");

// --- Void implícito ---
function imprimirParada(nombreParada: string) {
    // Sin tipo de retorno declarado = void implícito
    console.log(`Parada: ${nombreParada}`);
}

console.log("\n--- Paradas ---");
imprimirParada("Terminal");
imprimirParada("Plaza Mayor");
imprimirParada("Universidad");

// --- Diferencia entre void y undefined ---
function accion1(): void {
    console.log("Acción completada");
    // No tiene return
}

function accion2(): undefined {
    console.log("Acción con return explícito");
    return undefined;
}

console.log("\n--- Comparación ---");
accion1();
accion2();

console.log("\nTipo de retorno de iniciarMotor:", typeof iniciarMotor);
