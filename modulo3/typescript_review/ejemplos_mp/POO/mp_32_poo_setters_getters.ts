// ============================================
// MP_32: POO Setters y Getters - Capacidad y Velocidad
// ============================================

// --- Clase con getters y setters ---
class Bus {
    private _placa: string;
    private _capacidad: number;
    private _velocidadActual: number;
    private _velocidadMaxima: number;
    private _combustible: number;
    private _enMovimiento: boolean;

    constructor(placa: string, capacidad: number, velocidadMaxima: number) {
        this._placa = placa;
        this._capacidad = capacidad;
        this._velocidadActual = 0;
        this._velocidadMaxima = velocidadMaxima;
        this._combustible = 100;
        this._enMovimiento = false;
    }

    // --- Getters ---
    get placa(): string {
        return this._placa;
    }

    get capacidad(): number {
        return this._capacidad;
    }

    get velocidadActual(): number {
        return this._velocidadActual;
    }

    get velocidadMaxima(): number {
        return this._velocidadMaxima;
    }

    get combustible(): number {
        return this._combustible;
    }

    get enMovimiento(): boolean {
        return this._enMovimiento;
    }

    // --- Setters con validación ---
    set capacidad(valor: number) {
        if (valor < 10) {
            console.log("⚠ Capacidad mínima: 10 pasajeros");
            return;
        }
        if (valor > 100) {
            console.log("⚠ Capacidad máxima: 100 pasajeros");
            return;
        }
        this._capacidad = valor;
        console.log(`✓ Capacidad actualizada: ${this._capacidad} pasajeros`);
    }

    set velocidadActual(valor: number) {
        if (!this._enMovimiento) {
            console.log("⚠ El bus está detenido, no se puede cambiar velocidad");
            return;
        }
        if (valor < 0) {
            console.log("⚠ La velocidad no puede ser negativa");
            return;
        }
        if (valor > this._velocidadMaxima) {
            console.log(`⚠ Velocidad máxima: ${this._velocidadMaxima} km/h`);
            this._velocidadActual = this._velocidadMaxima;
            return;
        }
        this._velocidadActual = valor;
    }

    set combustible(valor: number) {
        if (valor < 0) {
            console.log("⚠ Combustible no puede ser negativo");
            return;
        }
        if (valor > 100) {
            console.log("⚠ Combustible máximo: 100%");
            return;
        }
        this._combustible = valor;
    }

    // --- Métodos ---
    iniciar(): void {
        if (this._combustible < 20) {
            console.log("⚠ Combustible insuficiente para iniciar");
            return;
        }
        this._enMovimiento = true;
        this._velocidadActual = 0;
        console.log(`🚌 Bus ${this._placa} iniciado`);
    }

    detener(): void {
        this._enMovimiento = false;
        this._velocidadActual = 0;
        console.log(`🛑 Bus ${this._placa} detenido`);
    }

    acelerar(incremento: number): void {
        if (!this._enMovimiento) {
            console.log("⚠ Inicie el bus primero");
            return;
        }
        this.velocidadActual = this._velocidadActual + incremento;
    }

    frenar(decremento: number): void {
        this.velocidadActual = Math.max(0, this._velocidadActual - decremento);
    }

    estado(): string {
        return `Bus ${this._placa} | ${this._enMovimiento ? `${this._velocidadActual} km/h` : "Detenido"} | Cap: ${this._capacidad} | ${this._combustible.toFixed(1)}%`;
    }
}

// --- Uso ---
console.log("=== Getters y Setters de Bus ===\n");

let bus1 = new Bus("ABC-123", 40, 80);

// Getters
console.log(`Placa: ${bus1.placa}`);
console.log(`Capacidad: ${bus1.capacidad}`);
console.log(`Vel. máxima: ${bus1.velocidadMaxima}`);

// Setter con validación
bus1.capacidad = 45;  // OK
bus1.capacidad = 5;   // Error: menor que mínimo
bus1.capacidad = 150; // Error: mayor que máximo

// Operación
bus1.iniciar();
bus1.acelerar(30);
console.log(`\n${bus1.estado()}`);

bus1.acelerar(25);
console.log(bus1.estado());

bus1.frenar(40);
console.log(bus1.estado());

bus1.detener();
console.log(`\n${bus1.estado()}`);

// --- Otro bus ---
console.log("\n--- Bus 2 ---");
let bus2 = new Bus("DEF-456", 50, 100);
bus2.combustible = 85;
bus2.iniciar();
bus2.velocidadActual = 90; // Intentar exceder velocidad máxima
console.log(`\n${bus2.estado()}`);

bus2.velocidadActual = -10; // Error: negativa
bus2.combustible = -5;      // Error: negativo
bus2.combustible = 120;     // Error: mayor que 100
