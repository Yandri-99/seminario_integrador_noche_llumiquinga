// Concepto puro
const puertos: Record<string, number> = {
  HTTP: 80,
  HTTPS: 443,
  SSH: 22,
};

for (const servicio in puertos) {
  console.log(`${servicio} → puerto ${puertos[servicio]}`);
}
// HTTP → puerto 80, HTTPS → puerto 443, SSH → puerto 22

const config = {
  host: "localhost",
  port: 8080,
  debug: true,
  maxConexiones: 100,
};

console.log("=== Configuración activa ===");
for (const clave in config) {
  const valor = config[clave as keyof typeof config];
  console.log(`${clave.padEnd(15)}: ${valor}`);
}

const notas = {
  host: "notas",
  mate: 95,
  debug: true,
  fisica: 70,
  quimica: 95,
  historia: 600,
};

let contador = 0;

console.log("=== Notas ===");
for (const materia in notas) {
  const nota = notas[materia as keyof typeof notas];
  console.log(`${materia.padEnd(15)}: ${nota}`);

  if (nota >= 70) {
    contador++;
  }
}
console.log(`materias aprobadas: ${contador}`);