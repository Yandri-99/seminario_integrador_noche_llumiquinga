// tipos-boolean.ts
const mayorDeEdad:  boolean = true;
const tieneCuenta:  boolean = false;

console.log(mayorDeEdad);
console.log(!mayorDeEdad);              // false  (negación)
console.log(mayorDeEdad && tieneCuenta); // false  (ambos deben ser true)
console.log(mayorDeEdad || tieneCuenta); // true   (al menos uno es true)

// Los booleanos suelen venir de comparaciones
const edad = 20;
const esAdulto: boolean = edad >= 18;
console.log(`¿Es adulto? ${esAdulto}`); // ¿Es adulto? true