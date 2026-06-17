// tipos-number.ts
const entero:     number = 42;
const decimal:    number = 3.14;
const negativo:   number = -100;
const grande:     number = 1_000_000;  // el _ es solo visual, no cambia el valor
const resultado:  number = 10 / 3;

console.log(entero);
console.log(decimal);
console.log(grande);
console.log(resultado);                   // 3.3333...
console.log(resultado.toFixed(2));        // "3.33"

// Operaciones
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.333...
console.log(10 % 3);   // 1  (resto de la división)
console.log(2 ** 10);  // 1024  (potencia)