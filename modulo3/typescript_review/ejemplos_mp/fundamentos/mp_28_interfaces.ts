// ============================================
// MP_28: Interfaces - Bus, Route, Driver, Trip
// ============================================

// --- Interfaz Bus ---
interface Bus {
    placa: string;
    capacidad: number;
    marca: string;
    modelo: number;
    kilometraje: number;
    combustible: number;
    activo: boolean;
    rutaAsignada?: string; // opcional
}

// --- Interfaz Route ---
interface Route {
    codigo: string;
    nombre: string;
    distancia: number;
    paradas: string[];
    tarifa: number;
    tiempoEstimado: number;
}

// --- Interfaz Driver ---
interface Driver {
    nombre: string;
    licencia: string;
    telefono?: string;
    experiencia: number;
    turno: "mañana" | "tarde" | "noche";
    busAsignado?: string;
}

// --- Interfaz Trip ---
interface Trip {
    id: number;
    busPlaca: string;
    rutaCodigo: string;
    conductor: string;
    fecha: Date;
    pasajeros: number;
    ingresos: number;
    estado: "programado" | "en_curso" | "completado" | "cancelado";
}

// --- Implementar interfaces ---
let bus1: Bus = {
    placa: "ABC-123",
    capacidad: 40,
    marca: "Mercedes",
    modelo: 2022,
    kilometraje: 125000,
    combustible: 85,
    activo: true,
    rutaAsignada: "RT-05"
};

let ruta1: Route = {
    codigo: "RT-05",
    nombre: "Centro - Norte",
    distancia: 15.5,
    paradas: ["Terminal", "Plaza", "Hospital", "Universidad"],
    tarifa: 2500,
    tiempoEstimado: 45
};

let conductor1: Driver = {
    nombre: "Carlos Mendoza",
    licencia: "B2-12345",
    telefono: "300-123-4567",
    experiencia: 8,
    turno: "mañana",
    busAsignado: "ABC-123"
};

let viaje1: Trip = {
    id: 1,
    busPlaca: "ABC-123",
    rutaCodigo: "RT-05",
    conductor: "Carlos Mendoza",
    fecha: new Date(),
    pasajeros: 32,
    ingresos: 80000,
    estado: "completado"
};

console.log("=== Datos del Sistema de Transporte ===");

console.log("\n--- Bus ---");
console.log(`  Placa: ${bus1.placa}`);
console.log(`  Marca: ${bus1.marca} ${bus1.modelo}`);
console.log(`  Capacidad: ${bus1.capacidad}`);
console.log(`  Kilometraje: ${bus1.kilometraje} km`);
console.log(`  Combustible: ${bus1.combustible}%`);
console.log(`  Ruta: ${bus1.rutaAsignada ?? "Sin asignar"}`);

console.log("\n--- Ruta ---");
console.log(`  Código: ${ruta1.codigo}`);
console.log(`  Nombre: ${ruta1.nombre}`);
console.log(`  Distancia: ${ruta1.distancia} km`);
console.log(`  Paradas: ${ruta1.paradas.join(" → ")}`);
console.log(`  Tarifa: $${ruta1.tarifa}`);
console.log(`  Tiempo estimado: ${ruta1.tiempoEstimado} min`);

console.log("\n--- Conductor ---");
console.log(`  Nombre: ${conductor1.nombre}`);
console.log(`  Licencia: ${conductor1.licencia}`);
console.log(`  Turno: ${conductor1.turno}`);
console.log(`  Experiencia: ${conductor1.experiencia} años`);

console.log("\n--- Viaje ---");
console.log(`  ID: ${viaje1.id}`);
console.log(`  Bus: ${viaje1.busPlaca}`);
console.log(`  Ruta: ${viaje1.rutaCodigo}`);
console.log(`  Estado: ${viaje1.estado}`);
console.log(`  Pasajeros: ${viaje1.pasajeros}`);

// --- Interface con métodos ---
interface TransportSystem {
    registrarBus(bus: Bus): void;
    buscarBus(placa: string): Bus | undefined;
    listarBusesActivos(): Bus[];
}

let sistema: TransportSystem = {
    registrarBus: (bus) => {
        console.log(`  Bus ${bus.placa} registrado`);
    },
    buscarBus: (placa) => {
        return bus1.placa === placa ? bus1 : undefined;
    },
    listarBusesActivos: () => {
        return [bus1];
    }
};

console.log("\n--- Sistema de Transporte ---");
sistema.registrarBus(bus1);
let encontrado = sistema.buscarBus("ABC-123");
console.log(`  Bus encontrado: ${encontrado?.placa}`);

// --- Interface extiende ---
interface VehiculoBase {
    placa: string;
    activo: boolean;
}

interface BusExtendido extends VehiculoBase {
    capacidad: number;
    tipo: "estándar" | "articulado" | "eléctrico";
}

let busExt: BusExtendido = {
    placa: "GHI-789",
    activo: true,
    capacidad: 80,
    tipo: "articulado"
};

console.log(`\nBus extendido: ${busExt.placa} (${busExt.tipo})`);

// --- Arreglo de interfaces ---
let flota: Bus[] = [bus1];
console.log(`\nFlota: ${flota.length} buses`);
