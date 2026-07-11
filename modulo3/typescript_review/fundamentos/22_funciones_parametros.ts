// Concepto puro

// Opcional: el parámetro puede no llegarse a pasar
function crearEtiqueta(texto: string, mayusculas?: boolean): string {
  // Dentro, mayusculas es boolean | undefined
  if (mayusculas) {
    return `[${texto.toUpperCase()}]`;
  }
  return `[${texto}]`;
}

console.log(crearEtiqueta("info"));          // [info]
console.log(crearEtiqueta("alerta", true)); // [ALERTA]

// Por defecto: si no se pasa, usa el valor indicado
function repetir(texto: string, veces: number = 3): string {
  return texto.repeat(veces);
}

console.log(repetir("ha"));    // hahaha  (usa el default 3)
console.log(repetir("ha", 5)); // hahahahaha



//ejemplo aplicado
type Nivel = "info" | "warn" | "error";

function log(
  mensaje: string,
  nivel: Nivel = "info",
  timestamp?: boolean
): string {
  const prefijos: Record<Nivel, string> = {
    info:  "ℹ️  INFO ",
    warn:  "⚠️  WARN ",
    error: "❌ ERROR",
  };

  const hora = timestamp ? ` [${new Date().toISOString()}]` : "";
  return `${prefijos[nivel]}${hora}: ${mensaje}`;
}

console.log(log("Servidor iniciado"));
// ℹ️  INFO : Servidor iniciado

console.log(log("Memoria alta", "warn"));
// ⚠️  WARN : Memoria alta

console.log(log("Conexión perdida", "error", true));
// ❌ ERROR [2026-06-23T...]: Conexión perdida