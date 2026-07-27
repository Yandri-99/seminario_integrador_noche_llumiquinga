// ============================================
// MP_18: While - Simulación de Consumo de Combustible
// ============================================

// --- While básico: consumo de combustible ---
let combustible: number = 100; // porcentaje
let distanciaRecorrida: number = 0;
let consumoPorKm: number = 0.5; // porcentaje por km

console.log("=== Simulación de Consumo de Combustible ===");
console.log(`Combustible inicial: ${combustible}%`);

while (combustible > 0 && distanciaRecorrida < 200) {
    combustible -= consumoPorKm;
    distanciaRecorrida++;

    if (distanciaRecorrida % 20 === 0) {
        console.log(`  Km ${distanciaRecorrida}: ${combustible.toFixed(1)}% restante`);
    }

    if (combustible <= 20 && combustible > 19.5) {
        console.log(`  ⚠ ¡ALERTA! Nivel bajo de combustible`);
    }
}

console.log(`\nResultado:`);
console.log(`  Distancia recorrida: ${distanciaRecorrida} km`);
console.log(`  Combustible restante: ${combustible.toFixed(1)}%`);

// --- While con pasajeros: subir y bajar ---
let pasajerosAbordo: number = 0;
let capacidadMaxima: number = 40;
let paradasRecorridas: number = 0;

console.log("\n--- Simulación de Paradas ---");

while (paradasRecorridas < 8) {
    paradasRecorridas++;
    let subiendo: number = Math.floor(Math.random() * 15);
    let bajando: number = Math.floor(Math.random() * 10);

    pasajerosAbordo = Math.max(0, pasajerosAbordo + subiendo - bajando);
    pasajerosAbordo = Math.min(pasajerosAbordo, capacidadMaxima);

    console.log(`  Parada ${paradasRecorridas}: +${subiendo} suben, -${bajando} bajan = ${pasajerosAbordo}/${capacidadMaxima}`);
}

// --- While con condiciones ---
let intentosLogin: number = 0;
let maximoIntentos: number = 3;
let autenticado: boolean = false;
let contrasenaCorrecta: string = "bus123";
let contrasenaIngresada: string[] = ["wrong", "bus123", "wrong2"];

console.log("\n--- Intentos de Login del Conductor ---");

while (intentosLogin < maximoIntentos && !autenticado) {
    intentosLogin++;
    let intento = contrasenaIngresada[intentosLogin - 1];

    if (intento === contrasenaCorrecta) {
        autenticado = true;
        console.log(`  Intento ${intentosLogin}: ✓ Autenticado`);
    } else {
        console.log(`  Intento ${intentosLogin}: ✗ Contraseña incorrecta`);
    }
}

if (!autenticado) {
    console.log("  Cuenta bloqueada por intentos fallidos");
}

// --- While con acumulador: total de ingresos ---
let viajes: number[] = [32, 28, 35, 40, 25, 30, 38];
let totalIngresos: number = 0;
let indice: number = 0;
let tarifa: number = 2500;

console.log("\n--- Ingresos del Día ---");

while (indice < viajes.length) {
    let ingresoViaje: number = viajes[indice] * tarifa;
    totalIngresos += ingresoViaje;
    console.log(`  Viaje ${indice + 1}: ${viajes[indice]} pasajeros = $${ingresoViaje.toLocaleString()}`);
    indice++;
}

console.log(`  Total del día: $${totalIngresos.toLocaleString()}`);

// --- While con Array.pop: procesar cola ---
let colaEmbarque: string[] = ["Ana", "Luis", "María", "Pedro", "Laura"];

console.log("\n--- Procesando Cola de Embarque ---");
let posicion: number = 1;

while (colaEmbarque.length > 0) {
    let pasajero = colaEmbarque.shift(); // Extraer primero
    console.log(`  ${posicion}. ${pasajero} aborda el bus`);
    posicion++;
}

console.log("  Todos los pasajeros han abordado");
