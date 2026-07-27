// Concepto puro
interface Serializable {
  serializar(): string;
}

interface Validable {
  esValido(): boolean;
}

class Pedido implements Serializable, Validable {
  constructor(
    public id: string,
    public productos: string[],
    public total: number
  ) {}

  serializar(): string {
    return JSON.stringify({ id: this.id, productos: this.productos, total: this.total });
  }

  esValido(): boolean {
    return this.productos.length > 0 && this.total > 0;
  }
}

const pedido = new Pedido("P-001", ["Mouse", "Teclado"], 150);
console.log(pedido.esValido());    // true
console.log(pedido.serializar());
// {"id":"P-001","productos":["Mouse","Teclado"],"total":150}


////
interface RepositorioLectura<T> {
  buscarPorId(id: number): T | undefined;
  listarTodos(): T[];
}

interface RepositorioEscritura<T> {
  guardar(entidad: T): void;
  eliminar(id: number): boolean;
}

interface Repositorio<T> extends RepositorioLectura<T>, RepositorioEscritura<T> {}

interface UsuarioEntidad {
  id: number;
  nombre: string;
}

class RepositorioUsuarios implements Repositorio<UsuarioEntidad> {
  private datos: UsuarioEntidad[] = [];

  guardar(u: UsuarioEntidad): void {
    this.datos.push(u);
  }

  eliminar(id: number): boolean {
    const idx = this.datos.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    this.datos.splice(idx, 1);
    return true;
  }

  buscarPorId(id: number): UsuarioEntidad | undefined {
    return this.datos.find((u) => u.id === id);
  }

  listarTodos(): UsuarioEntidad[] {
    return [...this.datos];
  }
}

const repo = new RepositorioUsuarios();
repo.guardar({ id: 1, nombre: "Ana" });
repo.guardar({ id: 2, nombre: "Luis" });
console.log(repo.buscarPorId(1));  // { id: 1, nombre: 'Ana' }
console.log(repo.listarTodos().length); // 2
repo.eliminar(1);
console.log(repo.listarTodos().length); // 1