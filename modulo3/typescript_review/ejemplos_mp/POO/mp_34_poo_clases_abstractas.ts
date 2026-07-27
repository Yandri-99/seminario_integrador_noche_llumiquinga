// ============================================
// MP_34: POO Clases Abstractas - VehiculoTransporte
// ============================================

// --- Clase abstracta ---
abstract class VehiculoTransporte {
    abstract readonly tipo: string;
    abstract readonly capacidadMaxima: number;
    
    protected _placa: string;
    protected _marca: string;
    protected _modelo: number;
    protected _kilometraje: number;
    protected _activo: boolean;

    constructor(placa: string, marca: string, modelo: number) {
        this._placa = placa;
        this._marca = marca;
        this._modelo = modelo;
        this._kilometraje = 0;
        this._activo = true;
    }

    // Métodos abstractos (deben ser implementados por subclases)
    abstract iniciar(): string;
    abstract detener(): string;
    abstract calcularTarifa(distancia: number): number;

    // Métodos concretos (compartidos por todas las subclases)
    get placa(): string {
        return this._placa;
    }

    get kilometraje(): number {
        return this._kilometraje;
    }

    recorrer(distancia: number): void {
        this._kilometraje += distancia;
    }

    informacion(): string {
        return `[${this.tipo}] ${this._marca} ${this._modelo} | ${this._placa} | ${this._kilometraje} km | Cap: ${this.capacidadMaxima}`;
    }
}

// --- Subclase: Bus ---
class Bus extends VehiculoTransporte {
    readonly tipo = "Bus";
    readonly capacidadMaxima = 40;
    private ruta: string;

    constructor(placa: string, marca: string, modelo: number, ruta: string) {
        super(placa, marca, modelo);
        this.ruta = ruta;
    }

    iniciar(): string {
        return `🚌 Bus ${this._placa} iniciando ruta ${this.ruta}`;
    }

    detener(): string {
        return `🛑 Bus ${this._placa} detenido en ${this.ruta}`;
    }

    calcularTarifa(distancia: number): number {
        return 2500 + (distancia * 150);
    }
}

// --- Subclase: Taxi ---
class Taxi extends VehiculoTransporte {
    readonly tipo = "Taxi";
    readonly capacidadMaxima = 4;
    private tarifaPorKm: number;

    constructor(placa: string, marca: string, modelo: number, tarifa: number) {
        super(placa, marca, modelo);
        this.tarifaPorKm = tarifa;
    }

    iniciar(): string {
        return `🚕 Taxi ${this._placa} disponible`;
    }

    detener(): string {
        return `🚕 Taxi ${this._placa} fuera de servicio`;
    }

    calcularTarifa(distancia: number): number {
        return distancia * this.tarifaPorKm;
    }
}

// --- Subclase: Microbus ---
class Microbus extends VehiculoTransporte {
    readonly tipo = "Microbus";
    readonly capacidadMaxima = 20;
    private paradas: string[];

    constructor(placa: string, marca: string, modelo: number, paradas: string[]) {
        super(placa, marca, modelo);
        this.paradas = paradas;
    }

    iniciar(): string {
        return `🚐 Microbus ${this._placa} con ${this.paradas.length} paradas`;
    }

    detener(): string {
        return `🚐 Microbus ${this._placa} completó ruta`;
    }

    calcularTarifa(distancia: number): number {
        return 1500 + (distancia * 100);
    }
}

// --- Uso de la clase abstracta ---
console.log("=== Clases Abstractas de Transporte ===\n");

// No se puede instanciar una clase abstracta
// let vehiculo = new VehiculoTransporte("ABC", "Marca", 2022); // Error

// Crear instancias de subclases
let bus1 = new Bus("ABC-123", "Mercedes", 2022, "Ruta 5");
let taxi1 = new Taxi("DEF-456", "Toyota", 2023, 3000);
let micro1 = new Microbus("GHI-789", "Hyundai", 2021, ["Terminal", "Plaza", "Hospital"]);

// Usar métodos abstractos implementados
console.log("--- Iniciar ---");
console.log(bus1.iniciar());
console.log(taxi1.iniciar());
console.log(micro1.iniciar());

console.log("\n--- Calcular Tarifa (10 km) ---");
console.log(`Bus: $${bus1.calcularTarifa(10)}`);
console.log(`Taxi: $${taxi1.calcularTarifa(10)}`);
console.log(`Microbus: $${micro1.calcularTarifa(10)}`);

console.log("\n--- Información ---");
console.log(bus1.informacion());
console.log(taxi1.informacion());
console.log(micro1.informacion());

// --- Polimorfismo con clase abstracta ---
console.log("\n--- Polimorfismo ---");
let flota: VehiculoTransporte[] = [bus1, taxi1, micro1];

flota.forEach(v => {
    v.recorrer(25);
    console.log(`\n${v.informacion()}`);
    console.log(`  Tarifa (5 km): $${v.calcularTarifa(5)}`);
});

// --- Usar tipo abstracto como parámetro ---
function mostrarDetalles(vehiculo: VehiculoTransporte): void {
    console.log(`\n--- Detalles del ${vehiculo.tipo} ---`);
    console.log(`  ${vehiculo.informacion()}`);
    console.log(`  Capacidad: ${vehiculo.capacidadMaxima}`);
    console.log(`  Tarifa (8 km): $${vehiculo.calcularTarifa(8)}`);
}

mostrarDetalles(bus1);
mostrarDetalles(taxi1);
