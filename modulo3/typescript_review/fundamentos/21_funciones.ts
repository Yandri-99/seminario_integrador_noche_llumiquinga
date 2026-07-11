// Concepto puro
function suma(a: number, b: number): number {
  return a + b;
}

function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

// TypeScript verifica el argumento Y el retorno
console.log(suma(3, 4));        // 7
console.log(saludar("Sofía")); // Hola, Sofía

// Error de compilación — a propósito (descoméntalo para verlo):
// suma("3", 4);  // Argument of type 'string' is not assignable to 'number'


//Calculadora
function calcularDescuento(precio: number, porcentaje: number): number {
  const descuento = precio * (porcentaje / 100);
  return Number((precio - descuento).toFixed(2));
}

function resumenCompra(producto: string, precio: number, descuento: number): string {
  const final = calcularDescuento(precio, descuento);
  return `${producto}: $${precio} → $${final} (${descuento}% off)`;
}

console.log(resumenCompra("Teclado", 120, 15));   // Teclado: $120 → $102 (15% off)
console.log(resumenCompra("Monitor", 350, 20));   // Monitor: $350 → $280 (20% off)
console.log(resumenCompra("Mouse", 45, 0));       // Mouse: $45 → $45 (0% off)