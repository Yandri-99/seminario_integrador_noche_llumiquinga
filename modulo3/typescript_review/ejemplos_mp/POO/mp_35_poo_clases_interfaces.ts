// ============================================
// MP_35: POO Clases con Interfaces - Transportable, Locatable
// ============================================

// --- Interfaces ---
interface Transportable {
    readonly id: string;
    nombre: string;
    capacidad: number;
    estaDisponible(): boolean;
    describir(): string;
}

interface Locatable {
    latitud: number;
    longitud: number;
    actualizarUbicacion(lat: number, lng: number): void;
    obtenerUbicacion(): string;
}

interface Mantenible {
    kilometraje: number;
    ultimoMantenimiento: Date;
    necesitaMantenimiento(): boolean;
    registrarMantenimiento(): void;
}

// --- Clase Bus implementa múltiples interfaces ---
class Bus implements Transportable, Locatable, Mantenible {
    readonly id: string;
    nombre: string;
    capacidad: number;
    latitud: number;
    longitud: number;
    kilometraje: number;
    ultimoMantenimiento: Date;
    private _disponible: boolean;
    private ruta: string;

    constructor(
        id: string,
        nombre: string,
        capacidad: number,
        lat: number,
        lng: number,
        ruta: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.capacidad = capacidad;
        this.latitud = lat;
        this.longitud = lng;
        this.kilometraje = 0;
        this.ultimoMantenimiento = new Date();
        this._disponible = true;
        this.ruta = ruta;
    }

    // Transportable
    estaDisponible(): boolean {
        return this._disponible;
    }

    describir(): string {
        return `Bus ${this.nombre} (${this.id}) | Cap: ${this.capacidad} | ${this.ruta}`;
    }

    // Locatable
    actualizarUbicacion(lat: number, lng: number): void {
        this.latitud = lat;
        this.longitud = lng;
    }

    obtenerUbicacion(): string {
        return `(${this.latitud.toFixed(4)}, ${this.longitud.toFixed(4)})`;
    }

    // Mantenible
    necesitaMantenimiento(): boolean {
        let diasDesdeUltimo = Math.floor(
            (Date.now() - this.ultimoMantenimiento.getTime()) / (1000 * 60 * 60 * 24)
        );
        return diasDesdeUltimo > 30 || this.kilometraje > 50000;
    }

    registrarMantenimiento(): void {
        this.ultimoMantenimiento = new Date();
        this.kilometraje = 0;
        console.log(`  ✓ Mantenimiento registrado para ${this.nombre}`);
    }
}

// --- Clase Parada implementa Locatable ---
class Parada implements Locatable {
    readonly id: string;
    nombre: string;
    latitud: number;
    longitud: number;
    accesible: boolean;

    constructor(id: string, nombre: string, lat: number, lng: number, accesible: boolean) {
        this.id = id;
        this.nombre = nombre;
        this.latitud = lat;
        this.longitud = lng;
        this.accesible = accesible;
    }

    actualizarUbicacion(lat: number, lng: number): void {
        this.latitud = lat;
        this.longitud = lng;
    }

    obtenerUbicacion(): string {
        return `${this.nombre}: (${this.latitud.toFixed(4)}, ${this.longitud.toFixed(4)})`;
    }
}

// --- Clase Taxi implementa Transportable y Locatable ---
class Taxi implements Transportable, Locatable {
    readonly id: string;
    nombre: string;
    capacidad: number;
    latitud: number;
    longitud: number;
    private _ocupado: boolean;

    constructor(id: string, nombre: string, lat: number, lng: number) {
        this.id = id;
        this.nombre = nombre;
        this.capacidad = 4;
        this.latitud = lat;
        this.longitud = lng;
        this._ocupado = false;
    }

    estaDisponible(): boolean {
        return !this._ocupado;
    }

    describir(): string {
        return `Taxi ${this.nombre} (${this.id}) | ${this._ocupado ? "Ocupado" : "Disponible"}`;
    }

    actualizarUbicacion(lat: number, lng: number): void {
        this.latitud = lat;
        this.longitud = lng;
    }

    obtenerUbicacion(): string {
        return `(${this.latitud.toFixed(4)}, ${this.longitud.toFixed(4)})`;
    }
}

// --- Uso ---
console.log("=== Interfaces de Transporte ===\n");

// Crear instancias
let bus1 = new Bus("BUS-001", "Bus Express", 40, 4.7109, -74.0720, "Ruta 5");
let taxi1 = new Taxi("TAXI-001", "Toyota Blanco", 4.7100, -74.0715);
let parada1 = new Parada("P001", "Terminal Central", 4.7109, -74.0720, true);

// Transportable
console.log("--- Transportable ---");
let transportables: Transportable[] = [bus1, taxi1];
transportables.forEach(t => {
    console.log(`  ${t.describir()}`);
    console.log(`  Disponible: ${t.estaDisponible()}`);
});

// Locatable
console.log("\n--- Locatable ---");
let localizables: Locatable[] = [bus1, taxi1, parada1];
localizables.forEach(l => {
    console.log(`  ${l.obtenerUbicacion()}`);
    l.actualizarUbicacion(4.7200, -74.0800);
    console.log(`  Actualizada: ${l.obtenerUbicacion()}`);
});

// Mantenible
console.log("\n--- Mantenible ---");
console.log(`  ${bus1.nombre} necesita mantenimiento: ${bus1.necesitaMantenimiento()}`);
bus1.kilometraje = 55000;
console.log(`  Después de 55000 km: ${bus1.necesitaMantenimiento()}`);
bus1.registrarMantenimiento();
console.log(`  Después de mantenimiento: ${bus1.necesitaMantenimiento()}`);

// --- Función con interfaz ---
function mostrarTransporte(vehiculo: Transportable & Locatable): void {
    console.log(`\n  ${vehiculo.describir()}`);
    console.log(`  Ubicación: ${vehiculo.obtenerUbicacion()}`);
}

console.log("\n--- Transporte con Ubicación ---");
mostrarTransporte(bus1);
mostrarTransporte(taxi1);
