// Concepto puro
class Producto {
  nombre: string;
  precio: number;
  enStock: boolean;

  constructor(nombre: string, precio: number, enStock: boolean) {
    this.nombre = nombre;
    this.precio = precio;
    this.enStock = enStock;
  }

  // Método: acción que puede realizar la instancia
  describir(): string {
    const estado = this.enStock ? "disponible" : "agotado";
    return `${this.nombre} — $${this.precio} (${estado})`;
  }
}

const teclado = new Producto("Teclado mecánico", 120, true);
const monitor = new Producto("Monitor 4K", 450, false);

console.log(teclado.describir()); // Teclado mecánico — $120 (disponible)
console.log(monitor.describir()); // Monitor 4K — $450 (agotado)


///
class Temperatura {
  valorCelsius: number;
  valorFahrenheit: number;

  constructor(celsius: number, fahrenheit: number) {
    this.valorCelsius = celsius;
    this.valorFahrenheit = fahrenheit;
  }

  aFahrenheit(): number {
    return this.valorFahrenheit * 9 / 5 - 32;
  }

  aCelsius(): number {
    return (this.valorFahrenheit - 32) * 5 / 9;
  }

  aKelvin(): number {
    return this.valorCelsius + 273.15;
  }

  describir(): string {
    return (
      `${this.valorCelsius}°C = ` +
      `${this.aFahrenheit()}°F = ` +
      `${this.aKelvin()}K`
    );
  }
}

const hervor = new Temperatura(100,0);
const congelacion = new Temperatura(0,0);
const toCelsius = new Temperatura(32, 0);

console.log(hervor.describir());     // 100°C = 212°F = 373.15K
console.log(congelacion.describir()); // 0°C = 32°F = 273.15K
console.log(toCelsius.describir());   // 32°C = 89.6°F = 305.15K