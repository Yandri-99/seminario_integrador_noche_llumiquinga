// objetos.ts

// Declarar el tipo del objeto
const persona: { nombre: string; edad: number; activo: boolean } = {
  nombre: "Ana García",
  edad:   28,
  activo: true
};

console.log(persona.nombre);
console.log(persona.edad);

// TypeScript avisa si falta una propiedad o tiene el tipo incorrecto
// const persona2: { nombre: string; edad: number } = {
//   nombre: "Luis"
//   // ❌ Error: falta 'edad'
// };

// Propiedad opcional — se añade ? después del nombre
const producto: { nombre: string; precio: number; descuento?: number } = {
  nombre:  "Laptop",
  precio:  999
  // descuento es opcional, no hace falta incluirlo
};

console.log(producto.descuento); // undefined — no se lanza error