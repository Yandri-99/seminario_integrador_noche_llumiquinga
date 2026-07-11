// arrays.ts

const nombres:   string[]  = ["Ana", "Luis", "Marta"];
const edades:    number[]  = [28, 31, 25];
const activos:   boolean[] = [true, false, true];

console.log(nombres);
console.log(nombres[0]);        // "Ana"
console.log(nombres.length);    // 3

// Los métodos de array funcionan igual que en JS
nombres.push("Carlos");
console.log(nombres);

const mayusculas = nombres.map(n => n.toUpperCase());
console.log(mayusculas);

const adultos = edades.filter(e => e >= 18);
console.log(adultos);

// TypeScript avisa si añades el tipo incorrecto
// nombres.push(42);  // ❌ Error: 'number' no es 'string'