const paquetes: number[] = [64, 128, -1, 256, 1024, -1, 32];
//                                  ↑              ↑   corruptos (negativos)

// continue: ignora los corruptos pero sigue procesando
console.log("=== con continue ===");
for (const p of paquetes) {
  if (p < 0) {
    console.log("Paquete corrupto ignorado");
    continue;  // salta al siguiente
  }
  console.log(`Procesando ${p} bytes`);
}

// break: se detiene al primer error crítico
console.log("=== con break ===");
for (const p of paquetes) {
  if (p < 0) {
    console.log("Error crítico — deteniendo");
    break;  // sale del bucle
  }
  console.log(`Procesando ${p} bytes`);
}