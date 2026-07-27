// ============================================
// MP_30: POO Temperaturas → Clase Ruta con Distancia/Tiempo
// ============================================

// --- Clase Ruta (adaptada de Temperaturas) ---
class Ruta {
    codigo: string;
    nombre: string;
    distancia: number; // km
    paradas: string[];
    private tiempos: number[]; // tiempo entre paradas en minutos

    constructor(codigo: string, nombre: string, distancia: number, paradas: string[]) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.distancia = distancia;
        this.paradas = paradas;
        this.tiempos = [];
    }

    // Registrar tiempo entre paradas
    registrarTiempo(indice: number, minutos: number): void {
        if (indice >= 0 && indice < this.paradas.length - 1) {
            this.tiempos[indice] = minutos;
            console.log(`  Tiempo de ${this.paradas[indice]} a ${this.paradas[indice + 1]}: ${minutos} min`);
        }
    }

    // Obtener tiempo total
    obtenerTiempoTotal(): number {
        return this.tiempos.reduce((total, t) => total + (t || 0), 0);
    }

    // Obtener tiempo promedio por parada
    obtenerTiempoPromedio(): number {
        if (this.tiempos.length === 0) return 0;
        return this.obtenerTiempoTotal() / this.tiempos.length;
    }

    // Obtener tramo más largo
    obtenerTramoLargo(): { desde: string; hasta: string; minutos: number } | null {
        if (this.tiempos.length === 0) return null;
        
        let maxIndice = 0;
        let maxTiempo = this.tiempos[0];
        
        for (let i = 1; i < this.tiempos.length; i++) {
            if ((this.tiempos[i] || 0) > maxTiempo) {
                maxTiempo = this.tiempos[i] || 0;
                maxIndice = i;
            }
        }
        
        return {
            desde: this.paradas[maxIndice],
            hasta: this.paradas[maxIndice + 1],
            minutos: maxTiempo
        };
    }

    // Obtener tramo más corto
    obtenerTramoCorto(): { desde: string; hasta: string; minutos: number } | null {
        if (this.tiempos.length === 0) return null;
        
        let minIndice = 0;
        let minTiempo = this.tiempos[0];
        
        for (let i = 1; i < this.tiempos.length; i++) {
            if ((this.tiempos[i] || Infinity) < minTiempo) {
                minTiempo = this.tiempos[i] || Infinity;
                minIndice = i;
            }
        }
        
        return {
            desde: this.paradas[minIndice],
            hasta: this.paradas[minIndice + 1],
            minutos: minTiempo
        };
    }

    // Mostrar información de la ruta
    mostrarInfo(): void {
        console.log(`\n=== Ruta ${this.codigo} - ${this.nombre} ===`);
        console.log(`  Distancia total: ${this.distancia} km`);
        console.log(`  Número de paradas: ${this.paradas.length}`);
        console.log(`  Tiempo total: ${this.obtenerTiempoTotal()} min`);
        console.log(`  Tiempo promedio por tramo: ${this.obtenerTiempoPromedio().toFixed(1)} min`);
        
        console.log(`\n  Recorrido:`);
        for (let i = 0; i < this.paradas.length; i++) {
            let tiempo = this.tiempos[i] || 0;
            if (i < this.paradas.length - 1) {
                console.log(`    ${this.paradas[i]} → ${this.paradas[i + 1]}: ${tiempo} min`);
            }
        }
    }
}

// --- Uso de la clase ---
console.log("=== Gestión de Rutas ===\n");

let ruta1 = new Ruta("RT-05", "Centro - Norte", 15.5, [
    "Terminal", "Plaza Mayor", "Hospital", "Universidad", "Aeropuerto"
]);

// Registrar tiempos entre paradas
ruta1.registrarTiempo(0, 8);  // Terminal → Plaza
ruta1.registrarTiempo(1, 12); // Plaza → Hospital
ruta1.registrarTiempo(2, 10); // Hospital → Universidad
ruta1.registrarTiempo(3, 15); // Universidad → Aeropuerto

ruta1.mostrarInfo();

// Obtener estadísticas
let tramoLargo = ruta1.obtenerTramoLargo();
let tramoCorto = ruta1.obtenerTramoCorto();

if (tramoLargo) {
    console.log(`\n  Tramo más largo: ${tramoLargo.desde} → ${tramoLargo.hasta} (${tramoLargo.minutos} min)`);
}

if (tramoCorto) {
    console.log(`  Tramo más corto: ${tramoCorto.desde} → ${tramoCorto.hasta} (${tramoCorto.minutos} min)`);
}

// --- Crear otra ruta ---
let ruta2 = new Ruta("RT-02", "Express Sur", 22, [
    "Centro", "Norte", "Aeropuerto"
]);

ruta2.registrarTiempo(0, 20);
ruta2.registrarTiempo(1, 25);

ruta2.mostrarInfo();

// --- Comparar rutas ---
console.log("\n--- Comparación de Rutas ---");
let rutas: Ruta[] = [ruta1, ruta2];

rutas.forEach(r => {
    console.log(`  ${r.codigo}: ${r.distancia} km, ${r.obtenerTiempoTotal()} min`);
});
