// null-undefined.ts

// En JS esto no da error, en TS sí (modo estricto)
// let nombre: string = null;    // ❌ Error

// Para permitir null hay que declararlo explícitamente
let nombre: string | null = null;   // ✅ puede ser string o null

nombre = "Ana";
console.log(nombre);  // "Ana"
nombre = null;
console.log(nombre);  // null

// undefined — variable declarada pero sin valor
let ciudad: string | undefined;
console.log(ciudad);  // undefined

ciudad = "Madrid";
console.log(ciudad);  // "Madrid"