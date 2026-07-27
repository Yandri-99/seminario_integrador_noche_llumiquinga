// ============================================
// MP_03: Strings - Información de Rutas y Conductores
// ============================================

// --- Strings básicos ---
let nombreConductor: string = "Carlos Mendoza";
let codigoRuta: string = "RT-05";
let nombreParada: string = "Plaza Principal";

console.log(`Conductor: ${nombreConductor}`);
console.log(`Código de ruta: ${codigoRuta}`);
console.log(`Parada: ${nombreParada}`);

// --- Propiedades y métodos de strings ---
let mensajeRuta: string = "  Ruta Centro - Norte  ";

console.log(`\nOriginal: "${mensajeRuta}"`);
console.log(`trim(): "${mensajeRuta.trim()}"`);
console.log(`toUpperCase(): "${mensajeRuta.trim().toUpperCase()}"`);
console.log(`toLowerCase(): "${mensajeRuta.trim().toLowerCase()}"`);

// --- Longitud ---
let placaBus: string = "ABC-123";
console.log(`\nPlaca "${placaBus}" tiene ${placaBus.length} caracteres`);

// --- indexOf y includes ---
let descripcionRuta: string = "La ruta 5 conecta el centro con el norte de la ciudad";
console.log(`\n¿Contiene "ruta"? ${descripcionRuta.includes("ruta")}`);
console.log(`¿Contiene "sur"? ${descripcionRuta.includes("sur")}`);
console.log(`Posición de "centro": ${descripcionRuta.indexOf("centro")}`);

// --- substring y slice ---
let codigoCompleto: string = "BUS-2024-001";
console.log(`\nCódigo completo: ${codigoCompleto}`);
console.log(`Prefijo (slice): ${codigoCompleto.slice(0, 3)}`);
console.log(`Año (substring): ${codigoCompleto.substring(4, 8)}`);

// --- Template literals ---
let linea: string = "Línea 1";
let destino: string = "Aeropuerto";
let horario: string = "06:00 - 22:00";

console.log(`\n--- Información de Línea ---`);
console.log(`${linea} → ${destino}`);
console.log(`Horario: ${horario}`);
console.log(`Ruta: ${linea.toLowerCase().replace("línea", "L")} al ${destino}`);

// --- Conversión ---
let numPasajeros: number = 35;
let textoPasajeros: string = String(numPasajeros);
console.log(`\nPasajeros como string: "${textoPasajeros}"`);
console.log(`Longitud del texto: ${textoPasajeros.length}`);

// --- repeat y replace ---
let lineaSeparadora: string = "─";
console.log(`\n${lineaSeparadora.repeat(30)}`);
let saludo: string = "Buenos días pasajeros";
console.log(saludo.replace("pasajeros", "usuarios del transporte"));
