// tipos-string.ts
const nombre:    string = "Tairon";
const dueño:    string = `Edison, ${nombre}`;
const raza:     string = "pitbull";
const color:  string = 'cafe';

console.log(raza);
console.log(dueño);
console.log(`color: ${color}`);

// Métodos de string funcionan igual que en JS
console.log(nombre.toUpperCase());      // ANA GARCÍA
console.log(nombre.toLowerCase());      // ana garcía
console.log(nombre.includes("pitbull")); // true
console.log(nombre.split(" "));         // ["Ana", "García"]