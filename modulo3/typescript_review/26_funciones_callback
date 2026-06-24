// Concepto puro

// Tipo de función nombrado
type Transformador = (x: number) => number;
type Predicado     = (x: number) => boolean;

// Función que RECIBE una función (orden superior)
function aplicar(n: number, fn: Transformador): number {
  return fn(n);
}

// Función que DEVUELVE una función
function multiplicadorDe(factor: number): Transformador {
  return (x) => x * factor;
}

// Uso
const triple = multiplicadorDe(3);
const cuadrado: Transformador = (x) => x * x;

console.log(aplicar(5, triple));    // 15
console.log(aplicar(5, cuadrado)); // 25
console.log(aplicar(5, (x) => x + 10)); // 15 (lambda inline)

// Filtrar con un predicado tipado
function filtrar(nums: number[], condicion: Predicado): number[] {
  return nums.filter(condicion);
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(filtrar(nums, (n) => n % 2 === 0)); // [2, 4, 6, 8]
console.log(filtrar(nums, (n) => n > 5));       // [6, 7, 8]


//ejemplo aplicado
type Pedido = { id: number; total: number; cliente: string };
type ProcesadorPedido = (pedido: Pedido) => Pedido;

// Funciones que transforman un pedido
const aplicarIVA: ProcesadorPedido = (p) => ({
  ...p,
  total: Number((p.total * 1.19).toFixed(2)),
});

const aplicarDescuentoVIP = (descuento: number): ProcesadorPedido =>
  (p) => ({ ...p, total: Number((p.total * (1 - descuento)).toFixed(2)) });

// Pipeline: aplica una lista de procesadores en orden
function procesarPedido(pedido: Pedido, pasos: ProcesadorPedido[]): Pedido {
  return pasos.reduce((p, fn) => fn(p), pedido);
}

const pedido: Pedido = { id: 101, total: 100, cliente: "Ana" };

const resultado = procesarPedido(pedido, [
  aplicarDescuentoVIP(0.10),  // 10% descuento VIP → $90
  aplicarIVA,                 // + 19% IVA         → $107.10
]);

console.log(resultado);
// { id: 101, total: 107.1, cliente: 'Ana' }