// Concepto puro
class Circulo {
  private _radio: number;

  constructor(radio: number) {
    this._radio = radio;
  }

  get radio(): number {
    return this._radio;
  }

  set radio(valor: number) {
    if (valor <= 0) throw new Error("El radio debe ser positivo");
    this._radio = valor;
  }

  get area(): number {
    return Math.PI * this._radio ** 2;
  }
}

const c = new Circulo(5);
console.log(c.radio);          // 5   ← usa el getter
console.log(c.area.toFixed(2)); // 78.54

c.radio = 10;                  // usa el setter
console.log(c.area.toFixed(2)); // 314.16

// c.radio = -3;  // Error: El radio debe ser positivo



///
class Porcentaje {
  private _valor: number;

  constructor(valor: number) {
    this._valor = 0;
    this.valor = valor; // pasa por el setter para validar
  }

  get valor(): number {
    return this._valor;
  }

  set valor(v: number) {
    if (v < 0 || v > 100) {
      throw new Error(`Porcentaje inválido: ${v}. Debe estar entre 0 y 100.`);
    }
    this._valor = v;
  }

  get complemento(): number {
    return 100 - this._valor;
  }

  toString(): string {
    return `${this._valor}% (complemento: ${this.complemento}%)`;
  }
}

const descuento = new Porcentaje(25);
console.log(descuento.toString()); // 25% (complemento: 75%)
descuento.valor = 40;
console.log(descuento.toString()); // 40% (complemento: 60%)

// new Porcentaje(150); // Error: Porcentaje inválido: 150