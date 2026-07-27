// ============================================
// MP_07: Any - Datos Flexibles de Transporte
// ============================================

// --- Any permite cualquier tipo ---
// Útil cuando el tipo de datos no es conocido en tiempo de compilación

let datosFlexibles: any;

datosFlexibles = "Ruta 5";
console.log(`String: ${datosFlexibles}`);

datosFlexibles = 45;
console.log(`Number: ${datosFlexibles}`);

datosFlexibles = true;
console.log(`Boolean: ${datosFlexibles}`);

datosFlexibles = { bus: "ABC-123", ruta: "Centro" };
console.log(`Objeto:`, datosFlexibles);

// --- Any en arreglos mixtos ---
let datosTransporte: any[] = [
    "Ruta Norte",
    45,                // capacidad
    true,              // activo
    { lat: 4.71, lng: -74.07 }, // coordenadas
    null
];

console.log("\n--- Datos Mixtos de Transporte ---");
datosTransporte.forEach((dato, i) => {
    console.log(`[${i}] ${typeof dato}: ${dato}`);
});

// --- Any con objetos flexibles ---
let registroDinamico: any = {};

registroDinamico.bus = "DEF-456";
registroDinamico.conductor = "Ana Ruiz";
registroDinamico.kilometros = 125000;
registroDinamico.mantenimientos = ["frenos", "aceite", "filtros"];

console.log("\n--- Registro Dinámico ---");
console.log(`Bus: ${registroDinamico.bus}`);
console.log(`Conductor: ${registroDinamico.conductor}`);
console.log(`Mantenimientos: ${registroDinamico.mantenimientos.join(", ")}`);

// --- Función con Any ---
function procesarDato(dato: any): string {
    if (typeof dato === "string") {
        return `Texto: ${dato.toUpperCase()}`;
    } else if (typeof dato === "number") {
        return `Número: ${dato * 2}`;
    } else if (typeof dato === "boolean") {
        return `Booleano: ${dato ? "Sí" : "No"}`;
    }
    return `Otro tipo: ${typeof dato}`;
}

console.log("\n--- Procesamiento de Datos ---");
console.log(procesarDato("bus express"));
console.log(procesarDato(1200));
console.log(procesarDato(false));

// --- Advertencia: Any reduce la seguridad de tipos ---
// Se recomienda usar tipos específicos cuando sea posible
let placaSegura: string = "GHI-789";
// placaSegura = 123;  // Error TS: Type 'number' is not assignable to type 'string'

let placaCualquiera: any = "JKL-012";
placaCualquiera = 123; // Permitido pero puede causar errores en runtime

console.log("\n--- Comparación de Seguridad ---");
console.log(`Placa segura (string): ${placaSegura}`);
console.log(`Placa any: ${placaCualquiera}`);

console.log(`\ntypeof datosFlexibles: ${typeof datosFlexibles}`);
