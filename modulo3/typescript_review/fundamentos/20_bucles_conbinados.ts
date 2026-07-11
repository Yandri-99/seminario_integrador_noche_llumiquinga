type Estado = "ok" | "lento" | "caido";

interface Servidor {
  nombre: string;
  estado: Estado;
  latenciaMs: number;
}

const servidores: Servidor[] = [
  { nombre: "web-01", estado: "ok",    latenciaMs: 25 },
  { nombre: "web-02", estado: "lento", latenciaMs: 320 },
  { nombre: "db-01",  estado: "caido", latenciaMs: 0 },
  { nombre: "cache",  estado: "ok",    latenciaMs: 8 },
];

console.log("=== Diagnóstico ===");
let caidos = 0;

for (const s of servidores) {
  if (s.estado === "caido") caidos++;

  // switch para traducir el estado a un ícono
  let icono: string;
  switch (s.estado) {
    case "ok":    icono = "🟢"; break;
    case "lento": icono = "🟡"; break;
    case "caido": icono = "🔴"; break;
    default:      icono = "⚪";
  }

  // if anidado para matizar el diagnóstico
  let diagnostico: string;
  if (s.estado === "ok") {
    if (s.latenciaMs < 50) {
      diagnostico = `${icono} ${s.nombre}: óptimo (${s.latenciaMs}ms)`;
    } else {
      diagnostico = `${icono} ${s.nombre}: aceptable (${s.latenciaMs}ms)`;
    }
  } else {
    diagnostico = `${icono} ${s.nombre}: requiere atención (${s.estado})`;
  }

  console.log(diagnostico);
}

// while para alertar mientras haya caídos (simulado)
let alerta = caidos;
while (alerta > 0) {
  console.log(`🚨 Quedan ${alerta} servidor(es) caído(s) — notificando...`);
  alerta--;
}
console.log(`Resumen: ${caidos}/${servidores.length} caídos`);