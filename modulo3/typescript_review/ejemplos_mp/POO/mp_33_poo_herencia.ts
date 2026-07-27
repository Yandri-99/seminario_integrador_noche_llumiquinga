// ============================================
// MP_33: POO Herencia - Vehiculo > Bus, Taxi, Microbus
// ============================================

// --- Clase base: Vehiculo ---
class Vehiculo {
    placa: string;
    marca: string;
    modelo: number;
    color: string;
    protected kilometraje: number;
    private _activo: boolean;

    constructor(placa: string, marca: string, modelo: number, color: string) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.kilometraje = 0;
        this._activo = true;
    }

    get activo(): boolean {
        return this._activo;
    }

    encender(): string {
        if (!this._activo) return `${this.placa} no está activo`;
        return `${this.placa} encendido`;
    }

    apagar(): string {
        return `${this.placa} apagado`;
    }

    recorrer(distancia: number): void {
        this.kilometraje += distancia;
    }

    informacion(): string {
        return `${this.marca} ${this.modelo} | Placa: ${this.placa} | ${this.color} | ${this.kilometraje} km`;
    }
}

// --- Subclase: Bus ---
class Bus extends Vehiculo {
    capacidad: number;
    ruta: string;
    private _aireAcondicionado: boolean;

    constructor(
        placa: string,
        marca: string,
        modelo: number,
        color: string,
        capacidad: number,
        ruta: string,
        aire: boolean
    ) {
        super(placa, marca, modelo, color);
        this.capacidad = capacidad;
        this.ruta = ruta;
        this._aireAcondicionado = aire;
    }

    get tieneAire(): boolean {
        return this._aireAcondicionado;
    }

    infoBus(): string {
        return `${this.informacion()} | Cap: ${this.capacidad} | Ruta: ${this.ruta}`;
    }
}

// --- Subclase: Taxi ---
class Taxi extends Vehiculo {
    tarifaPorKm: number;
    private _ocupado: boolean;
    private _destino: string;

    constructor(
        placa: string,
        marca: string,
        modelo: number,
        color: string,
        tarifa: number
    ) {
        super(placa, marca, modelo, color);
        this.tarifaPorKm = tarifa;
        this._ocupado = false;
        this._destino = "";
    }

    get ocupado(): boolean {
        return this._ocupado;
    }

    get destino(): string {
        return this._destino;
    }

    aceptarPasajero(destino: string): string {
        if (this._ocupado) return "Taxi ya está ocupado";
        this._ocupado = true;
        this._destino = destino;
        return `Taxi ${this.placa} dirigiéndose a ${destino}`;
    }

    liberar(distancia: number): number {
        this.recorrer(distancia);
        this._ocupado = false;
        let costo = distancia * this.tarifaPorKm;
        this._destino = "";
        return costo;
    }

    infoTaxi(): string {
        return `${this.informacion()} | Tarifa: $${this.tarifaPorKm}/km | ${this._ocupado ? "Ocupado → " + this._destino : "Disponible"}`;
    }
}

// --- Subclase: Microbus ---
class Microbus extends Vehiculo {
    capacidad: number;
    paradas: string[];
    private _numParadas: number;

    constructor(
        placa: string,
        marca: string,
        modelo: number,
        color: string,
        capacidad: number,
        paradas: string[]
    ) {
        super(placa, marca, modelo, color);
        this.capacidad = capacidad;
        this.paradas = paradas;
        this._numParadas = 0;
    }

    get numParadas(): number {
        return this._numParadas;
    }

    avanzarParada(): string {
        if (this._numParadas >= this.paradas.length - 1) {
            return "Microbus llegó al final de la ruta";
        }
        this._numParadas++;
        return `Parada: ${this.paradas[this._numParadas]}`;
    }

    infoMicrobus(): string {
        return `${this.informacion()} | Cap: ${this.capacidad} | Paradas: ${this.paradas.length}`;
    }
}

// --- Uso de la herencia ---
console.log("=== Sistema de Herencia de Transporte ===\n");

// Bus
let bus1 = new Bus("ABC-123", "Mercedes", 2022, "Rojo", 40, "Ruta 5", true);
console.log("--- Bus ---");
console.log(bus1.infoBus());
console.log(bus1.encender());
bus1.recorrer(50);
console.log(`Aire acondicionado: ${bus1.tieneAire ? "Sí" : "No"}`);

// Taxi
let taxi1 = new Taxi("DEF-456", "Toyota", 2023, "Blanco", 2500);
console.log("\n--- Taxi ---");
console.log(taxi1.infoTaxi());
console.log(taxi1.aceptarPasajero("Aeropuerto"));
console.log(taxi1.infoTaxi());
let costo = taxi1.liberar(15);
console.log(`Costo del viaje: $${costo.toLocaleString()}`);
console.log(taxi1.infoTaxi());

// Microbus
let micro1 = new Microbus("GHI-789", "Hyundai", 2021, "Azul", 20, [
    "Terminal", "Plaza", "Hospital", "Universidad"
]);
console.log("\n--- Microbus ---");
console.log(micro1.infoMicrobus());
console.log(micro1.encender());
console.log(micro1.avanzarParada());
console.log(micro1.avanzarParada());
console.log(micro1.avanzarParada());
console.log(`Paradas recorridas: ${micro1.numParadas}`);

// --- Polimorfismo ---
console.log("\n--- Polimorfismo ---");
let vehiculos: Vehiculo[] = [bus1, taxi1, micro1];

vehiculos.forEach(v => {
    console.log(`  ${v.informacion()}`);
    v.recorrer(10);
    console.log(`  Después de 10 km: ${v.informacion()}`);
});
