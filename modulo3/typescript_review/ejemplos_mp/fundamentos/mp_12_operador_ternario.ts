// ============================================
// MP_12: Operador Ternario - Cálculo de Tarifas
// ============================================

// --- Ternario básico: tarifa según tipo de pasajero ---
let tipoPasajero: string = "estudiante";
let tarifaBase: number = 2500;

let tarifa = tipoPasajero === "estudiante" ? tarifaBase * 0.5 :
             tipoPasajero === "adultoMayor" ? tarifaBase * 0.4 :
             tipoPasajero === "discapacidad" ? tarifaBase * 0.3 :
             tarifaBase;

console.log("=== Cálculo de Tarifa ===");
console.log(`Tipo: ${tipoPasajero}`);
console.log(`Tarifa base: $${tarifaBase}`);
console.log(`Tarifa a pagar: $${tarifa}`);

// --- Ternario simple: descuento por volumen ---
let cantidadPasajes: number = 12;
let descuento = cantidadPasajes >= 10 ? "10%" : "0%";

console.log(`\n--- Descuento por Volumen ---`);
console.log(`Pasajes: ${cantidadPasajes}`);
console.log(`Descuento: ${descuento}`);

// --- Estado del bus ---
let pasajeros: number = 35;
let capacidad: number = 40;
let estado = pasajeros >= capacidad ? "LLENO" : "DISPONIBLE";

console.log(`\n--- Estado del Bus ---`);
console.log(`${pasajeros}/${capacidad} pasajeros`);
console.log(`Estado: ${estado}`);

// --- Tarifa por hora ---
let horaActual: number = 14;
let esPico = (horaActual >= 7 && horaActual <= 9) || (horaActual >= 17 && horaActual <= 19);
let tarifaHora = esPico ? tarifaBase * 1.5 : tarifaBase;

console.log(`\n--- Tarifa por Hora ---`);
console.log(`Hora: ${horaActual}:00`);
console.log(`¿Horario pico? ${esPico ? "Sí" : "No"}`);
console.log(`Tarifa: $${tarifaHora}`);

// --- Condiciones de servicio ---
let nivelCombustible: number = 18;
let enMantenimiento: boolean = false;
let servicioDisponible = nivelCombustible > 20 && !enMantenimiento ? "DISPONIBLE" :
                          enMantenimiento ? "EN MANTENIMIENTO" :
                          "SIN COMBUSTIBLE";

console.log(`\n--- Estado del Servicio ---`);
console.log(`Combustible: ${nivelCombustible}%`);
console.log(`Mantenimiento: ${enMantenimiento}`);
console.log(`Servicio: ${servicioDisponible}`);

// --- Ternario anidado con mensajes ---
let tipoRuta: string = "express";
let distancia: number = 12;
let tiempoEstimado = tipoRuta === "express" ? `${(distancia / 50).toFixed(0)} min` :
                     tipoRuta === "regular" ? `${(distancia / 30).toFixed(0)} min` :
                     `${(distancia / 20).toFixed(0)} min`;

console.log(`\n--- Tiempo Estimado ---`);
console.log(`Tipo de ruta: ${tipoRuta}`);
console.log(`Distancia: ${distancia} km`);
console.log(`Tiempo estimado: ${tiempoEstimado}`);

// --- Múltiples ternarios ---
let pasajero: { edad: number; esEstudiante: boolean; tienePase: boolean } = {
    edad: 22,
    esEstudiante: true,
    tienePase: false
};

let tarifaFinal = pasajero.tienePase ? 0 :
                  pasajero.esEstudiante ? tarifaBase * 0.5 :
                  pasajero.edad >= 65 ? tarifaBase * 0.4 :
                  tarifaBase;

let mensaje = pasajero.tienePase ? "Pase gratuito" :
              `Paga $${tarifaFinal}`;

console.log(`\n--- Tarifa Individual ---`);
console.log(`Edad: ${pasajero.edad}, Estudiante: ${pasajero.esEstudiante}, Pase: ${pasajero.tienePase}`);
console.log(`Resultado: ${mensaje}`);
