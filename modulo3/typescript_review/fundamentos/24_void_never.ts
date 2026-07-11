
// Concepto puro
// void — no hay valor de retorno significativo
function imprimirLinea(texto: string): void {
  console.log(texto);
  // No hay return, o hay un "return;" vacío
}

// never — la función nunca retorna
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
  // TypeScript sabe que el código tras throw es inalcanzable
}

function bucleInfinito(): never {
  while (true) {
    // proceso eterno de un worker, por ejemplo
  }
}

// Inferencia — TypeScript deduce "number"
function multiplicar(a: number, b: number) {
  return a * b; // tipo inferido: number
}

// Pero el retorno explícito actúa de contrato:
function dividir(a: number, b: number): number {
  if (b === 0) lanzarError("División por cero"); // never encaja en cualquier tipo
  return a / b;
}


//Ejemplo aplicado
// Concepto puro

// void — no hay valor de retorno significativo
function imprimirLinea(texto: string): void {
  console.log(texto);
  // No hay return, o hay un "return;" vacío
}

// never — la función nunca retorna
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
  // TypeScript sabe que el código tras throw es inalcanzable
}

function bucleInfinito(): never {
  while (true) {
    // proceso eterno de un worker, por ejemplo
  }
}

// Inferencia — TypeScript deduce "number"
function multiplicar(a: number, b: number) {
  return a * b; // tipo inferido: number
}

// Pero el retorno explícito actúa de contrato:
function dividir(a: number, b: number): number {
  if (b === 0) lanzarError("División por cero"); // never encaja en cualquier tipo
  return a / b;
}