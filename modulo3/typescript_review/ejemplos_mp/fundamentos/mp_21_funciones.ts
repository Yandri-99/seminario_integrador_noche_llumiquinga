// ============================================
// MP_21: Funciones - Cálculo de Tarifas y Distancias
// ============================================

// --- Función básica: calcular tarifa ---
function calcularTarifa(distancia: number, tipoPasajero: string): number {
    let tarifaBase: number = 2500;
    let tarifaPorKm: number = 150;
    
    let tarifa = tarifaBase + (distancia * tarifaPorKm);
    
    switch (tipoPasajero) {
        case "estudiante":
            return tarifa * 0.5;
        case "adultoMayor":
            return tarifa * 0.4;
        case "discapacidad":
            return tarifa * 0.3;
        default:
            return tarifa;
    }
}

console.log("=== Cálculo de Tarifas ===");
console.log(`Regular 10km: $${calcularTarifa(10, "regular")}`);
console.log(`Estudiante 10km: $${calcularTarifa(10, "estudiante")}`);
console.log(`Adulto mayor 10km: $${calcularTarifa(10, "adultoMayor")}`);

// --- Función: calcular distancia ---
function calcularDistancia(
    lat1: number, lng1: number,
    lat2: number, lng2: number
): number {
    // Fórmula简化 de Haversine
    const R: number = 6371; // Radio de la Tierra en km
    const dLat: number = (lat2 - lat1) * Math.PI / 180;
    const dLng: number = (lng2 - lng1) * Math.PI / 180;
    
    const a: number = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

console.log("\n--- Distancia entre Paradas ---");
let distancia = calcularDistancia(4.7109, -74.0720, 4.6097, -74.0817);
console.log(`Terminal → Plaza: ${distancia.toFixed(2)} km`);

// --- Función: tiempo estimado ---
function calcularTiempoEstimado(distancia: number, velocidadPromedio: number): string {
    let horas: number = distancia / velocidadPromedio;
    let horasEnteras: number = Math.floor(horas);
    let minutos: number = Math.round((horas - horasEnteras) * 60);
    
    return `${horasEnteras}h ${minutos}min`;
}

console.log("\n--- Tiempo Estimado ---");
console.log(`15 km a 40 km/h: ${calcularTiempoEstimado(15, 40)}`);
console.log(`25 km a 35 km/h: ${calcularTiempoEstimado(25, 35)}`);

// --- Función con retorno múltiple (objeto) ---
function analizarViaje(
    pasajeros: number,
    distancia: number,
    tarifa: number
): { ingresos: number; eficiencia: string; recomendacion: string } {
    let ingresos: number = pasajeros * tarifa;
    let ocupacion: number = pasajeros / 40; // Asumiendo capacidad 40
    let eficiencia: string = ocupacion > 0.8 ? "alta" : ocupacion > 0.5 ? "media" : "baja";
    let recomendacion: string = "";

    if (eficiencia === "baja") {
        recomendacion = "Reducir frecuencia en esta ruta";
    } else if (eficiencia === "alta") {
        recomendacion = "Considerar agregar más buses";
    } else {
        recomendacion = "Mantener frecuencia actual";
    }

    return { ingresos, eficiencia, recomendacion };
}

console.log("\n--- Análisis de Viaje ---");
let analisis = analizarViaje(32, 15, 2500);
console.log(`Ingresos: $${analisis.ingresos.toLocaleString()}`);
console.log(`Eficiencia: ${analisis.eficiencia}`);
console.log(`Recomendación: ${analisis.recomendacion}`);

// --- Función con valor por defecto ---
function registrarParada(
    nombre: string,
    latitud: number,
    longitud: number,
    accesible: boolean = true
): void {
    console.log(`  Parada: ${nombre}`);
    console.log(`  Coordenadas: (${latitud}, ${longitud})`);
    console.log(`  Accesible: ${accesible ? "Sí" : "No"}`);
}

console.log("\n--- Registrar Parada ---");
registrarParada("Hospital", 4.6321, -74.0657);
registrarParada("Paradasin Acceso", 4.7500, -74.0800, false);

// --- Función recursiva: countdown ---
function countdownParada(paradasRestantes: number): void {
    if (paradasRestantes === 0) {
        console.log("  ¡Ha llegado a su destino!");
        return;
    }
    console.log(`  Faltan ${paradasRestantes} parada(s)`);
    countdownParada(paradasRestantes - 1);
}

console.log("\n--- Countdown de Paradas ---");
countdownParada(4);
