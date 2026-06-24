// Concepto puro

// Declaración tradicional
function cuadrado(n: number): number {
  return n * n;
}

// Flecha equivalente — con cuerpo explícito
const cuadradoFlecha = (n: number): number => {
  return n * n;
};

// Flecha con retorno implícito (una expresión, sin llaves)
const cuadradoCorto = (n: number): number => n * n;

// Sin parámetros
const ahora = (): string => new Date().toLocaleTimeString();

// Un solo parámetro (paréntesis opcionales, pero recomendados en TS)
const doble = (n: number): number => n * 2;

console.log(cuadrado(5));       // 25
console.log(cuadradoFlecha(5)); // 25
console.log(cuadradoCorto(5));  // 25
console.log(doble(7));          // 14
console.log(ahora());           // e.g. "10:34:22"


//Ejemplo aplicado
const trim      = (s: string): string => s.trim();
const aMinusculas = (s: string): string => s.toLowerCase();
const capitalizar = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
const quitarEspacios = (s: string): string => s.replace(/\s+/g, "_");

// Encadenar transformaciones manualmente
function normalizarUsuario(nombre: string): string {
  return quitarEspacios(capitalizar(aMinusculas(trim(nombre))));
}

const entradas = ["  ANA GARCÍA  ", " luis rodríguez", "PEDRO  LÓPEZ "];
entradas.forEach((e) => console.log(normalizarUsuario(e)));
// Ana_garcía
// Luis_rodríguez
// Pedro__lópez  (doble espacio interno → doble guión)