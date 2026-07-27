// ============================================
// MP_31: POO Modificadores de Acceso - Bus
// ============================================

// --- Clase con modificadores de acceso ---
class BusControl {
    // public: accesible desde cualquier lugar
    public placa: string;
    public marca: string;
    public modelo: number;

    // protected: accesible dentro de la clase y subclases
    protected capacidad: number;
    protected ruta: string;

    // private: accesible solo dentro de la clase
    private combustible: number;
    private kilometraje: number;
    private conductorAsignado: string;

    constructor(
        placa: string,
        marca: string,
        modelo: number,
        capacidad: number,
        ruta: string,
        conductor: string
    ) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.capacidad = capacidad;
        this.ruta = ruta;
        this.combustible = 100;
        this.kilometraje = 0;
        this.conductorAsignado = conductor;
    }

    // Métodos públicos
    public iniciarRuta(): string {
        if (this.combustible < 20) {
            return `Bus ${this.placa} no puede iniciar: combustible bajo`;
        }
        return `Bus ${this.placa} inició la ruta ${this.ruta}`;
    }

    public recorrer(distancia: number): string {
        this.kilometraje += distancia;
        this.combustible -= distancia * 0.5;
        return `Recorrió ${distancia} km. Total: ${this.kilometraje} km`;
    }

    // Métodos privados (solo accesibles dentro de la clase)
    private verificarCombustible(): boolean {
        return this.combustible > 20;
    }

    private actualizarKilometraje(distancia: number): void {
        this.kilometraje += distancia;
    }

    // Método que usa métodos privados
    public estadoCompleto(): string {
        let disponible = this.verificarCombustible();
        return `Bus ${this.placa} | ${disponible ? "Listo" : "No disponible"} | ${this.combustible.toFixed(1)}% | ${this.kilometraje} km`;
    }

    // Getter para combustible (controlado)
    public getNivelCombustible(): number {
        return this.combustible;
    }

    // Setter para combustible (con validación)
    public setCombustible(nivel: number): void {
        if (nivel >= 0 && nivel <= 100) {
            this.combustible = nivel;
        } else {
            console.log("Nivel de combustible inválido");
        }
    }

    // Método protected accesible en subclases
    protected getCapacidad(): number {
        return this.capacidad;
    }

    protected getRuta(): string {
        return this.ruta;
    }
}

// --- Uso de la clase ---
console.log("=== Modificadores de Acceso ===\n");

let bus1 = new BusControl("ABC-123", "Mercedes", 2022, 40, "Ruta 5", "Carlos");

// Acceso público - OK
console.log(`Placa: ${bus1.placa}`);
console.log(`Marca: ${bus1.marca}`);
console.log(`Modelo: ${bus1.modelo}`);

// Acceso a métodos públicos - OK
console.log(`\n${bus1.iniciarRuta()}`);
console.log(bus1.recorrer(10));
console.log(bus1.estadoCompleto());

// Acceso a propiedades privadas - Error
// console.log(bus1.combustible); // Error: Property 'combustible' is private
// console.log(bus1.kilometraje); // Error: Property 'kilometraje' is private

// Usar getter/setter para combustible
console.log(`\nCombustible actual: ${bus1.getNivelCombustible()}%`);
bus1.setCombustible(75);
console.log(`Combustible después de set: ${bus1.getNivelCombustible()}%`);

// --- Subclase que usa protected ---
class BusPremium extends BusControl {
    private tieneWiFi: boolean;
    private tieneAire: boolean;

    constructor(
        placa: string,
        marca: string,
        modelo: number,
        capacidad: number,
        ruta: string,
        conductor: string,
        wifi: boolean,
        aire: boolean
    ) {
        super(placa, marca, modelo, capacidad, ruta, conductor);
        this.tieneWiFi = wifi;
        this.tieneAire = aire;
    }

    // Acceso a propiedades protected de la clase padre
    public infoPremium(): string {
        let info = `Bus Premium ${this.placa}`;
        info += ` | Cap: ${this.getCapacidad()}`; // protected: OK en subclase
        info += ` | Ruta: ${this.getRuta()}`;     // protected: OK en subclase
        info += ` | WiFi: ${this.tieneWiFi ? "Sí" : "No"}`;
        info += ` | A/C: ${this.tieneAire ? "Sí" : "No"}`;
        return info;
    }
}

console.log("\n--- Bus Premium ---");
let busPremium = new BusPremium("GHI-789", "Volvo", 2023, 45, "Ruta Express", "Ana Ruiz", true, true);
console.log(busPremium.infoPremium());

// --- Resumen de modificadores ---
console.log("\n--- Resumen ---");
console.log("  public: accesible desde cualquier lugar");
console.log("  protected: accesible en clase y subclases");
console.log("  private: accesible solo en la misma clase");
