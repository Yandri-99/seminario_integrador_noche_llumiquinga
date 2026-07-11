// bucle-for.ts

// For clásico
for (let i = 1; i <= 5; i++) {
  console.log(`Iteración ${i}`);
}

// Recorrer un array por índice
const frutas: string[] = ["manzana", "banana", "cereza", "durazno"];

for (let i = 0; i < frutas.length; i++) {
  console.log(`${i + 1}. ${frutas[i]}`);
}

// For hacia atrás
for (let i = frutas.length - 1; i >= 0; i--) {
  console.log(frutas[i]);
}

// Tabla de multiplicar tipada
function tablaMultiplicar(numero: number): void {
  console.log(`\n--- Tabla del ${numero} ---`);
  for (let i = 1; i <= 10; i++) {
    const resultado: number = numero * i;
    console.log(`  ${numero} x ${i.toString().padStart(2)} = ${resultado.toString().padStart(3)}`);
  }
}

tablaMultiplicar(7);