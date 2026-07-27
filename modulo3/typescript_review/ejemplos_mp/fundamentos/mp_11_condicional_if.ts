// ============================================
// MP_11: Condicional If - Combustible, Velocidad y Pasajeros
// ============================================

// --- Verificación de nivel de combustible ---
let nivelCombustible: number = 25;

console.log("=== Sistema de Combustible ===");
if (nivelCombustible > 75) {
    console.log(`Combustible: ${nivelCombustible}% - Nivel óptimo`);
} else if (nivelCombustible > 50) {
    console.log(`Combustible: ${nivelCombustible}% - Nivel aceptable`);
} else if (nivelCombustible > 20) {
    console.log(`Combustible: ${nivelCombustible}% - Nivel bajo, considere abastecer`);
} else {
    console.log(`Combustible: ${nivelCombustible}% - ¡CRÍTICO! Bus debe ir a tanquero`);
}

// --- Control de velocidad ---
let velocidadActual: number = 65;
let velocidadMaxima: number = 80;

console.log("\n--- Control de Velocidad ---");
if (velocidadActual > velocidadMaxima) {
    console.log(`⚠ Velocidad ${velocidadActual} km/h EXCEDE el límite de ${velocidadMaxima} km/h`);
} else if (velocidadActual === velocidadMaxima) {
    console.log(`⚡ Velocidad al límite: ${velocidadActual} km/h`);
} else if (velocidadActual > 0) {
    console.log(`✓ Velocidad normal: ${velocidadActual} km/h`);
} else {
    console.log(`⏸ Bus detenido`);
}

// --- Conteo de pasajeros ---
let pasajerosAbordo: number = 38;
let capacidadMaxima: number = 40;

console.log("\n--- Control de Pasajeros ---");
console.log(`Pasajeros: ${pasajerosAbordo}/${capacidadMaxima}`);

if (pasajerosAbordo >= capacidadMaxima) {
    console.log("🔴 Bus COMPLETO - No se permiten más pasajeros");
} else if (pasajerosAbordo >= capacidadMaxima * 0.9) {
    console.log("🟡 Bus casi lleno - Quedan pocos espacios");
} else if (pasajerosAbordo >= capacidadMaxima * 0.5) {
    console.log("🟢 Ocupación media - Hay espacio disponible");
} else if (pasajerosAbordo > 0) {
    console.log("🟢 Pocos pasajeros - Amplio espacio disponible");
} else {
    console.log("⚪ Bus vacío - Sin pasajeros");
}

// --- Condicionales anidados ---
let esHorarioPico: boolean = true;
let lloviendo: boolean = false;
let nivelTrafico: string = "alto";

console.log("\n--- Análisis de Tráfico ---");
if (esHorarioPico) {
    if (lloviendo) {
        console.log("Horario pico + Lluvia = Tráfico muy pesado");
    } else {
        if (nivelTrafico === "alto") {
            console.log("Horario pico + Tráfico alto = Posibles retrasos");
        } else if (nivelTrafico === "medio") {
            console.log("Horario pico + Tráfico medio = Tiempo adicional");
        } else {
            console.log("Horario pico pero tráfico bajo = Fluido");
        }
    }
} else {
    console.log("Fuera de horario pico = Tráfico normal");
}

// --- Condiciones múltiples ---
let conductorEdad: number = 28;
let experienciaAnos: number = 5;
let antecedentes: boolean = false;

console.log("\n--- Verificación del Conductor ---");
if (conductorEdad >= 21 && experienciaAnos >= 2 && !antecedentes) {
    console.log("✓ Conductor APTO para conducir buses pesados");
} else {
    let razones: string[] = [];
    if (conductorEdad < 21) razones.push("edad insuficiente");
    if (experienciaAnos < 2) razones.push("experiencia insuficiente");
    if (antecedentes) razones.push("tiene antecedentes");
    console.log(`✗ Conductor NO apto: ${razones.join(", ")}`);
}

// --- Verificación de parada ---
let coordenadaActual: number = 0.5;
let umbralParada: number = 0.1;

console.log("\n--- Detección de Parada ---");
if (Math.abs(coordenadaActual) <= umbralParada) {
    console.log("✓ Bus en zona de parada - Deteniendo...");
} else {
    console.log(`Bus en tránsito - Distancia a parada: ${(coordenadaActual - 0).toFixed(2)} km`);
}
