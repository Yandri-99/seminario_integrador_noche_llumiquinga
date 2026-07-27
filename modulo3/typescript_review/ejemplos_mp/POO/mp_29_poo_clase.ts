// ============================================
// MP_29: POO Clase - Clase Bus con Métodos
// ============================================

// --- Clase Bus ---
class Bus {
    // Propiedades
    placa: string;
    capacidad: number;
    ruta: string;
    conductor: string;
    combustible: number;
    kilometraje: number;
    pasajerosAbordo: number;
    enServicio: boolean;

    // Constructor
    constructor(
        placa: string,
        capacidad: number,
        ruta: string,
        conductor: string
    ) {
        this.placa = placa;
        this.capacidad = capacidad;
        this.ruta = ruta;
        this.conductor = conductor;
        this.combustible = 100;
        this.kilometraje = 0;
        this.pasajerosAbordo = 0;
        this.enServicio = false;
    }

    // Métodos
    iniciarRuta(): void {
        if (this.combustible > 20) {
            this.enServicio = true;
            console.log(`🚌 Bus ${this.placa} inició la ruta ${this.ruta}`);
        } else {
            console.log(`⚠ Bus ${this.placa} no puede iniciar: combustible bajo (${this.combustible}%)`);
        }
    }

    completarRuta(): void {
        this.enServicio = false;
        console.log(`✅ Bus ${this.placa} completó la ruta ${this.ruta}`);
    }

    subirPasajeros(cantidad: number): void {
        let espacioDisponible = this.capacidad - this.pasajerosAbordo;
        let subiendo = Math.min(cantidad, espacioDisponible);
        
        if (subiendo > 0) {
            this.pasajerosAbordo += subiendo;
            console.log(`  ↗ ${subiendo} pasajeros subieron (${this.pasajerosAbordo}/${this.capacidad})`);
            
            if (subiendo < cantidad) {
                console.log(`  ⚠ No había espacio para ${cantidad - subiendo} pasajeros`);
            }
        } else {
            console.log(`  ⚠ Bus lleno - No se permiten más pasajeros`);
        }
    }

    bajarPasajeros(cantidad: number): void {
        let bajando = Math.min(cantidad, this.pasajerosAbordo);
        this.pasajerosAbordo -= bajando;
        console.log(`  ↙ ${bajando} pasajeros bajaron (${this.pasajerosAbordo}/${this.capacidad})`);
    }

    recargarCombustible(litros: number): void {
        this.combustible = Math.min(100, this.combustible + litros);
        console.log(`⛽ Combustible recargado: ${this.combustible}%`);
    }

    recorrer(distancia: number): void {
        if (this.enServicio) {
            this.kilometraje += distancia;
            this.combustible -= distancia * 0.5;
            console.log(`  🛣 Recorrió ${distancia} km (Total: ${this.kilometraje} km)`);
            console.log(`  ⛽ Combustible: ${this.combustible.toFixed(1)}%`);
        }
    }

    estado(): string {
        return `Bus ${this.placa} | ${this.enServicio ? "🟢 En servicio" : "🔴 Detenido"} | ${this.pasajerosAbordo}/${this.capacidad} pasajeros | ${this.combustible.toFixed(1)}% combustible`;
    }
}

// --- Uso de la clase ---
console.log("=== Sistema de Gestión de Buses ===\n");

let bus1 = new Bus("ABC-123", 40, "Ruta 5 - Centro", "Carlos Mendoza");
let bus2 = new Bus("DEF-456", 50, "Ruta 2 - Sur", "María López");

console.log(bus1.estado());
console.log(bus2.estado());

console.log("\n--- Operación del Bus 1 ---");
bus1.iniciarRuta();
bus1.subirPasajeros(25);
bus1.recorrer(5);
bus1.subirPasajeros(15);
bus1.recorrer(8);
bus1.bajarPasajeros(10);
bus1.completarRuta();

console.log(`\n${bus1.estado()}`);

console.log("\n--- Operación del Bus 2 ---");
bus2.combustible = 15; // Simular bajo combustible
bus2.iniciarRuta();

// --- Arreglo de objetos ---
let flota: Bus[] = [bus1, bus2];

console.log("\n--- Estado de la Flota ---");
flota.forEach(b => console.log(`  ${b.estado()}`));
