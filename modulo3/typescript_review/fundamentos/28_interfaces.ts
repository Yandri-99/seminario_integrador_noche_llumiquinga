// Concepto puro
interface Usuario {
  readonly id: number;      // no se puede cambiar después de crear el objeto
  nombre: string;           // obligatoria
  email: string;            // obligatoria
  avatar?: string;          // opcional: puede estar o no
}

const u: Usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };

// u.id = 99; // ERROR: no se puede asignar a 'id' porque es de solo lectura

// La propiedad opcional puede omitirse sin error:
const u2: Usuario = { id: 2, nombre: "Luis", email: "luis@mail.com", avatar: "avatar.png" };


///
interface Producto {
  readonly sku: string;
  nombre: string;
  precio: number;
  descripcion?: string;   // texto largo, no siempre presente
  enStock: boolean;
}

function mostrarProducto(p: Producto): void {
  const desc = p.descripcion ? ` — ${p.descripcion}` : "";
  const stock = p.enStock ? "Disponible" : "Agotado";
  console.log(`[${p.sku}] ${p.nombre} $${p.precio}${desc} (${stock})`);
}

const laptop: Producto = {
  sku: "LAP-001",
  nombre: "Laptop Pro 15",
  precio: 1299,
  descripcion: "Pantalla 4K, 16 GB RAM",
  enStock: true,
};

const mouse: Producto = {
  sku: "MOU-042",
  nombre: "Mouse Inalámbrico",
  precio: 25,
  enStock: false,
};

mostrarProducto(laptop); 
mostrarProducto(mouse);  


///personas
interface Empleado {
  nombre: string;
  apellido: string;
  cargo: string;   
  ubicacion: string;
}

function mostrarEmpleado(p: Empleado): void {
  const desc = p.cargo ? ` — ${p.cargo}` : "";
  const ubicacion = p.ubicacion ? ` — ${p.ubicacion}` : "";
  console.log(`${p.nombre} ${p.apellido}${desc} (${ubicacion})`);
}

const empleado1: Empleado = {
  nombre: "yandri",
  apellido: "llumiquinga",
  cargo: "desarrollador",
  ubicacion: "quito",
};

const empleado2: Empleado = {
  nombre: "pepe",
  apellido: "Gonza",
  cargo: "grafico",
  ubicacion: "guayaquil",
};

mostrarEmpleado(empleado1); 
mostrarEmpleado(empleado2); 
