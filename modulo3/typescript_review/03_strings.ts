// tipos-string.ts
const nombre:    string = "Ana García";
const saludo:    string = `Hola, ${nombre}`;
const vacia:     string = "";
const comillas:  string = 'También con comillas simples';

console.log(nombre);
console.log(saludo);
console.log(`La cadena vacía tiene longitud: ${vacia.length}`);

// Métodos de string funcionan igual que en JS
console.log(nombre.toUpperCase());      // ANA GARCÍA
console.log(nombre.toLowerCase());      // ana garcía
console.log(nombre.includes("García")); // true
console.log(nombre.split(" "));         // ["Ana", "García"]