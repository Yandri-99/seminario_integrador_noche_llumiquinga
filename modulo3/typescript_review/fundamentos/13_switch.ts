// switch.ts

const dia: number = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");  // ← este se ejecuta
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
  case 7:
    console.log("Fin de semana");
    break;
  default:
    console.log("Día no válido");
}

// Switch con string
type EstadoPedido = "pendiente" | "enviado" | "entregado" | "cancelado";

function mensajePedido(estado: EstadoPedido): string {
  switch (estado) {
    case "pendiente":
      return "Tu pedido está siendo procesado";
    case "enviado":
      return "Tu pedido está en camino";
    case "entregado":
      return "Tu pedido ha sido entregado";
    case "cancelado":
      return "Tu pedido fue cancelado";
  }
}

// TypeScript sabe que los 4 casos son todos los posibles
// No necesita default — si añades un estado nuevo, exige manejarlo

console.log(mensajePedido("enviado"));    // Tu pedido está en camino
console.log(mensajePedido("entregado"));  // Tu pedido ha sido entregado