// Concepto puro
abstract class Figura {
  abstract area(): number;       // sin implementación — las subclases DEBEN implementarlo
  abstract perimetro(): number;

  // Los métodos concretos SÍ tienen implementación
  describir(): string {
    return (
      `Área: ${this.area().toFixed(2)} | ` +
      `Perímetro: ${this.perimetro().toFixed(2)}`
    );
  }
}

class Circulo2 extends Figura {
  constructor(private radio: number) {
    super();
  }

  override area(): number {
    return Math.PI * this.radio ** 2;
  }

  override perimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

class Rectangulo2 extends Figura {
  constructor(private ancho: number, private alto: number) {
    super();
  }

  override area(): number {
    return this.ancho * this.alto;
  }

  override perimetro(): number {
    return 2 * (this.ancho + this.alto);
  }
}

// const f = new Figura(); // Error: Cannot create an instance of an abstract class.

const circulo = new Circulo2(5);
const rect = new Rectangulo2(4, 6);

console.log(circulo.describir()); // Área: 78.54 | Perímetro: 31.42
console.log(rect.describir());    // Área: 24.00 | Perímetro: 20.00


///
abstract class MetodoPago {
  constructor(protected titular: string) {}

  abstract procesar(monto: number): string;

  abstract validar(): boolean;

  // Método concreto reutilizable
  resumen(monto: number): string {
    if (!this.validar()) return `[${this.titular}] Pago rechazado: datos inválidos.`;
    return this.procesar(monto);
  }
}

class TarjetaCredito extends MetodoPago {
  constructor(
    titular: string,
    private ultimos4: string,
    private saldoDisponible: number
  ) {
    super(titular);
  }

  override validar(): boolean {
    return this.ultimos4.length === 4 && this.saldoDisponible > 0;
  }

  override procesar(monto: number): string {
    if (monto > this.saldoDisponible) return "Fondos insuficientes en tarjeta.";
    this.saldoDisponible -= monto;
    return `Tarjeta ****${this.ultimos4}: $${monto} aprobado. Saldo restante: $${this.saldoDisponible}`;
  }
}

class TransferenciaBancaria extends MetodoPago {
  constructor(
    titular: string,
    private clabe: string
  ) {
    super(titular);
  }

  override validar(): boolean {
    return this.clabe.length === 18;
  }

  override procesar(monto: number): string {
    return `Transferencia de $${monto} para ${this.titular} a CLABE ${this.clabe.slice(-4).padStart(18, "*")}.`;
  }
}

const tarjeta = new TarjetaCredito("Ana", "4321", 500);
const transferencia = new TransferenciaBancaria("Luis", "123456789012345678");

console.log(tarjeta.resumen(200));
// Tarjeta ****4321: $200 aprobado. Saldo restante: $300

console.log(transferencia.resumen(1000));
// Transferencia de $1000 para Luis a CLABE **************5678.