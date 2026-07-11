// Concepto puro
type ID = string | number;           // unión de primitivos
type Nombre = string;                // alias de primitivo (documenta intención)
type Coordenadas = [number, number]; // alias de tupla

// Alias de objeto
type Punto = {
  x: number;
  y: number;
};

///
const origen: Punto = { x: 0, y: 0 };
const id: ID = 42;          // válido
const id2: ID = "usr-001";  // también válido

type TicketID = string | number;
type Prioridad = "baja" | "media" | "alta" | "critica";

type Ticket = {
  id: TicketID;
  titulo: string;
  prioridad: Prioridad;
  resuelta: boolean;
};

function imprimirTicket(t: Ticket): void {
  const estrella = t.prioridad === "critica" ? " ⚠️" : "";
  console.log(`[${t.id}] ${t.titulo} — ${t.prioridad}${estrella}`);
}

const t1: Ticket = { id: "T-001", titulo: "Error de login",  prioridad: "critica", resuelta: false };
const t2: Ticket = { id: 42,      titulo: "Ajuste de fuente", prioridad: "baja",    resuelta: true  };

imprimirTicket(t1); // [T-001] Error de login — critica ⚠️
imprimirTicket(t2); // [42] Ajuste de fuente — baja