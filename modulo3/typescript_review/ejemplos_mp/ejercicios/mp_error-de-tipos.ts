// ============================================
// MP: Errores de Tipos con Datos de Transporte
// ============================================

// --- Errores comunes de tipos ---

// 1. Asignar tipo incorrecto
let placaBus: string = "ABC-123";
// placaBus = 123; // Error: Type 'number' is not assignable to type 'string'

// 2. Operaciones entre tipos incompatibles
let capacidad: number = 40;
let capacidadTexto: string = "40";
// let suma = capacidad + capacidadTexto; // Resultado: "4040" (concatenación, no suma)

console.log("=== Errores Comunes de Tipos en Transporte ===");

// 3. Acceder a propiedad que no existe
interface Bus {
    placa: string;
    capacidad: number;
    activo: boolean;
}

let miBus: Bus = { placa: "ABC-123", capacidad: 40, activo: true };
// console.log(miBus.ruta); // Error: Property 'ruta' does not exist on type 'Bus'

// 4. Error con tipos literales
type EstadoBus = "activo" | "inactivo";
let estado: EstadoBus = "activo";
// estado = "en_mantenimiento"; // Error: not assignable

// 5. Error con null/undefined
let conductorAsignado: string = "Carlos";
// conductorAsignado = null; // Error: Type 'null' is not assignable to type 'string'

// Solución correcta:
let conductorSeguro: string | null = "Carlos";
conductorSeguro = null; // OK

// 6. Error con arreglos
let placas: string[] = ["ABC-123", "DEF-456"];
// placas.push(123); // Error: Argument of type 'number' is not assignable

// 7. Error con funciones
function calcularTarifa(distancia: number): number {
    return distancia * 150;
}

// calcularTarifa("10"); // Error: Argument of type 'string' is not assignable
// calcularTarifa("10", 2500); // Error: Expected 1 arguments, got 2

// --- Demostración de errores en runtime ---

// 8. Error de acceso a índice
let paradas: string[] = ["Terminal", "Plaza", "Hospital"];
console.log(`\nParada 1: ${paradas[0]}`);
console.log(`Parada 2: ${paradas[1]}`);
console.log(`Parada fuera de rango: ${paradas[5] ?? "No existe"}`);

// 9. Error de división por cero
let pasajeros: number = 0;
let distribucion = pasajeros / 3;
console.log(`\nDistribución: ${distribucion}`); // NaN

// 10. Error con undefined
let busEncontrado: Bus | undefined;
console.log(`\nBus encontrado: ${busEncontrado?.placa ?? "No encontrado"}`);

// --- Soluciones correctas ---

console.log("\n--- Soluciones Correctas ---");

// Type assertions
let inputPlaca: unknown = "ABC-123";
let placaSegura = inputPlaca as string;
console.log(`Placa: ${placaSegura}`);

// Optional chaining
let ruta: { nombre?: string } = {};
console.log(`Ruta: ${ruta.nombre ?? "Sin ruta"}`);

// Nullish coalescing
let nivelCombustible: number | null = null;
console.log(`Combustible: ${nivelCombustible ?? "No registrado"}%`);

// Type guards
function esBus(objeto: any): objeto is Bus {
    return objeto && typeof objeto.placa === "string" && typeof objeto.capacidad === "number";
}

let datos: any = { placa: "DEF-456", capacidad: 50, activo: true };
if (esBus(datos)) {
    console.log(`\nEs un bus válido: ${datos.placa}`);
}

// --- Ejemplo completo: validación ---
function validarBus(datos: unknown): Bus {
    if (typeof datos !== "object" || datos === null) {
        throw new Error("Datos inválidos");
    }
    
    const obj = datos as Record<string, unknown>;
    
    if (typeof obj.placa !== "string") {
        throw new Error("Placa inválida");
    }
    
    if (typeof obj.capacidad !== "number") {
        throw new Error("Capacidad inválida");
    }
    
    return {
        placa: obj.placa,
        capacidad: obj.capacidad,
        activo: (obj.activo as boolean) ?? true
    };
}

console.log("\n--- Validación de Datos ---");
try {
    let busValidado = validarBus({ placa: "GHI-789", capacidad: 35 });
    console.log(`Bus validado: ${busValidado.placa}`);
} catch (e) {
    console.log(`Error: ${(e as Error).message}`);
}
