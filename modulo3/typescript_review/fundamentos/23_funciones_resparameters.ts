// Concepto puro

// El rest parameter SIEMPRE es el último
function sumarTodos(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sumarTodos(1, 2, 3));          // 6
console.log(sumarTodos(10, 20, 30, 40));   // 100
console.log(sumarTodos());                 // 0

// Combinado con parámetros normales
function construirRuta(base: string, ...segmentos: string[]): string {
  return [base, ...segmentos].join("/");
}

console.log(construirRuta("https://api.ejemplo.com", "v1", "usuarios", "42"));
// https://api.ejemplo.com/v1/usuarios/42



//ejemplo aplicado
function registrarEvento(tipo: string, ...detalles: string[]): void {
  const timestamp = new Date().toLocaleTimeString();
  const cuerpo = detalles.length > 0 ? ` | ${detalles.join(" · ")}` : "";
  console.log(`[${timestamp}] ${tipo.toUpperCase()}${cuerpo}`);
}

registrarEvento("inicio");
// [10:05:01] INICIO

registrarEvento("login", "usuario: ana", "ip: 192.168.1.10");
// [10:05:02] LOGIN | usuario: ana · ip: 192.168.1.10

registrarEvento("error", "módulo: pagos", "código: 503", "reintento: sí");
// [10:05:03] ERROR | módulo: pagos · código: 503 · reintento: sí