// Concepto puro
class Animal {
  constructor(public nombre: string) {}

  hablar(): string {
    return `${this.nombre} hace un sonido.`;
  }
}

class Perro extends Animal {
  constructor(nombre: string, public raza: string) {
    super(nombre); // llama al constructor del padre
  }

  // override sobrescribe el método del padre
  override hablar(): string {
    return `${this.nombre} ladra: ¡Guau!`;
  }

  buscar(objeto: string): string {
    return `${this.nombre} busca el ${objeto}.`;
  }
}

const a = new Animal("Criatura");
const d = new Perro("Rex", "Labrador");

console.log(a.hablar());       // Criatura hace un sonido.
console.log(d.hablar());       // Rex ladra: ¡Guau!
console.log(d.buscar("palo")); // Rex busca el palo.
console.log(d.raza);           // Labrador


///
class Empleado {
  constructor(
    public nombre: string,
    protected salarioBase: number
  ) {}

  calcularSalario(): number {
    return this.salarioBase;
  }

  infoLaboral(): string {
    return `${this.nombre} — Salario: $${this.calcularSalario()}`;
  }
}

class Gerente extends Empleado {
  constructor(
    nombre: string,
    salarioBase: number,
    private bonificacion: number
  ) {
    super(nombre, salarioBase);
  }

  override calcularSalario(): number {
    return this.salarioBase + this.bonificacion;
  }
}

class Vendedor extends Empleado {
  constructor(
    nombre: string,
    salarioBase: number,
    private comision: number,
    private ventasMes: number
  ) {
    super(nombre, salarioBase);
  }

  override calcularSalario(): number {
    return this.salarioBase + this.comision * this.ventasMes;
  }
}

const emp = new Empleado("Carlos", 2000);
const ger = new Gerente("Laura", 3000, 1500);
const vend = new Vendedor("Pedro", 1500, 50, 30);

console.log(emp.infoLaboral());  // Carlos — Salario: $2000
console.log(ger.infoLaboral());  // Laura — Salario: $4500
console.log(vend.infoLaboral()); // Pedro — Salario: $3000