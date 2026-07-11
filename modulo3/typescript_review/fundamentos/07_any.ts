// tipo-any.ts

let dato: any = "hola";
dato = 42;        // ✅ sin error
dato = true;      // ✅ sin error
dato = [1, 2, 3]; // ✅ sin error

// Parece útil pero es trampa: pierdes el autocompletado
// y los errores vuelven a aparecer en tiempo de ejecución
console.log(dato.metodoQueNoExiste()); // TypeScript no avisa, pero falla al ejecutar


//unknown
// tipo-unknown.ts

function procesarDato(valor: unknown): string {
  // No puedo usar valor directamente — debo verificar primero

  if (typeof valor === "string") {
    // Aquí TypeScript sabe que es string
    return valor.toUpperCase();
  }

  if (typeof valor === "number") {
    // Aquí TypeScript sabe que es number
    return valor.toFixed(2);
  }

  if (typeof valor === "boolean") {
    return valor ? "Sí" : "No";
  }

  return "Tipo no reconocido";
}

console.log(procesarDato("hola"));   // HOLA
console.log(procesarDato(3.14159));  // 3.14
console.log(procesarDato(true));     // Sí
console.log(procesarDato(null));     // Tipo no reconocido