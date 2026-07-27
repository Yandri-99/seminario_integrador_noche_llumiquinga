// ============================================
// MP_13: Switch - Estados del Bus y Viajes
// ============================================

// --- Switch básico: estado del viaje ---
let estadoViaje: string = "en_curso";

console.log("=== Estado del Viaje ===");
switch (estadoViaje) {
    case "programado":
        console.log("El viaje está programado para más tarde");
        break;
    case "en_curso":
        console.log("El viaje está en curso - Bus en movimiento");
        break;
    case "completado":
        console.log("El viaje ha sido completado exitosamente");
        break;
    case "cancelado":
        console.log("El viaje ha sido cancelado");
        break;
    default:
        console.log(`Estado desconocido: ${estadoViaje}`);
}

// --- Switch con número: tipo de bus ---
let tipoBus: number = 2;

console.log("\n--- Tipo de Bus ---");
switch (tipoBus) {
    case 1:
        console.log("Bus estándar - 40 pasajeros");
        break;
    case 2:
        console.log("Bus articulado - 80 pasajeros");
        break;
    case 3:
        console.log("Bus minibús - 20 pasajeros");
        break;
    case 4:
        console.log("Bus eléctrico - 35 pasajeros");
        break;
    default:
        console.log("Tipo de bus no reconocido");
}

// --- Switch sin break (fall-through) ---
let categoria: string = "premium";

console.log("\n--- Categorías de Servicio ---");
switch (categoria) {
    case "premium":
        console.log("WiFi, A/C,ENCHUFES:");
    case "estándar":
    case "regular":
        console.log("A/C, Asientos reclinables:");
    case "básico":
        console.log("Transporte básico, sin extras");
        break;
    default:
        console.log("Categoría desconocida");
}

// --- Switch con default ---
let diaSemana: string = "sábado";

console.log("\n--- Horario de Operación ---");
switch (diaSemana) {
    case "lunes":
    case "martes":
    case "miércoles":
    case "jueves":
    case "viernes":
        console.log(`${diaSemana}: Operación de 5:00 AM a 10:00 PM`);
        break;
    case "sábado":
        console.log(`${diaSemana}: Operación de 6:00 AM a 8:00 PM`);
        break;
    case "domingo":
        console.log(`${diaSemana}: Operación de 7:00 AM a 6:00 PM`);
        break;
    default:
        console.log(`Día no válido: ${diaSemana}`);
}

// --- Switch con expresiones ---
let horaActual: number = 14;
let turno: string;

switch (true) {
    case horaActual >= 5 && horaActual < 12:
        turno = "Mañana";
        break;
    case horaActual >= 12 && horaActual < 18:
        turno = "Tarde";
        break;
    case horaActual >= 18 && horaActual < 22:
        turno = "Noche";
        break;
    default:
        turno = "Madrugada (sin servicio)";
}

console.log(`\n--- Turno Actual ---`);
console.log(`Hora: ${horaActual}:00`);
console.log(`Turno: ${turno}`);

// --- Switch anidado ---
let tipoPago: string = "tarjeta";
let tarifaBase: number = 2500;

console.log(`\n--- Procesamiento de Pago ---`);
switch (tipoPago) {
    case "efectivo":
        console.log(`Pago en efectivo: $${tarifaBase}`);
        break;
    case "tarjeta":
        console.log("Procesando tarjeta...");
        let banco: string = "BancoLocal";
        switch (banco) {
            case "BancoLocal":
                console.log(`Tarjeta débito - Sin recargo - Total: $${tarifaBase}`);
                break;
            case "BancoExtranjero":
                console.log(`Tarjeta internacional - 5% recargo - Total: $${tarifaBase * 1.05}`);
                break;
            default:
                console.log("Banco no reconocido");
        }
        break;
    case "pase":
        console.log("Pase de transportación - Gratis");
        break;
    default:
        console.log("Método de pago no válido");
}
