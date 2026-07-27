// ============================================
// MP: Catálogo de Tipos de Transporte
// ============================================

// --- Types para el catálogo ---
type TipoVehiculo = "bus" | "microbus" | "taxi" | "metro" | "tranvia" | "brt";
type EstadoVehiculo = "activo" | "inactivo" | "mantenimiento" | "retirado";
type NivelServicio = "basico" | "estandar" | "premium" | "express";

interface CatalogoTransporte {
    tipo: TipoVehiculo;
    nombre: string;
    descripcion: string;
    capacidadMinima: number;
    capacidadMaxima: number;
    velocidadPromedio: number;
    costoKm: number;
    nivelServicio: NivelServicio;
}

// --- Catálogo de tipos de transporte ---
const CATALOGO: CatalogoTransporte[] = [
    {
        tipo: "bus",
        nombre: "Bus Convencional",
        descripcion: "Transporte público de alta capacidad para rutas urbanas",
        capacidadMinima: 35,
        capacidadMaxima: 50,
        velocidadPromedio: 30,
        costoKm: 150,
        nivelServicio: "estandar"
    },
    {
        tipo: "microbus",
        nombre: "Microbús",
        descripcion: "Vehículo pequeño para rutas de baja demanda",
        capacidadMinima: 12,
        capacidadMaxima: 20,
        velocidadPromedio: 25,
        costoKm: 120,
        nivelServicio: "basico"
    },
    {
        tipo: "taxi",
        nombre: "Taxi",
        descripcion: "Servicio de transporte puerta a puerta",
        capacidadMinima: 1,
        capacidadMaxima: 4,
        velocidadPromedio: 35,
        costoKm: 3000,
        nivelServicio: "premium"
    },
    {
        tipo: "brt",
        nombre: "Bus Rapid Transit (BRT)",
        descripcion: "Sistema de buses rápidos con carril exclusivo",
        capacidadMinima: 60,
        capacidadMaxima: 120,
        velocidadPromedio: 40,
        costoKm: 200,
        nivelServicio: "express"
    },
    {
        tipo: "metro",
        nombre: "Metro",
        descripcion: "Transporte ferroviario urbano de alta capacidad",
        capacidadMinima: 800,
        capacidadMaxima: 2000,
        velocidadPromedio: 45,
        costoKm: 100,
        nivelServicio: "estandar"
    },
    {
        tipo: "tranvia",
        nombre: "Tranvía",
        descripcion: "Transporte sobre rieles en superficie",
        capacidadMinima: 150,
        capacidadMaxima: 300,
        velocidadPromedio: 20,
        costoKm: 180,
        nivelServicio: "premium"
    }
];

// --- Funciones del catálogo ---
function buscarPorTipo(tipo: TipoVehiculo): CatalogoTransporte | undefined {
    return CATALOGO.find(c => c.tipo === tipo);
}

function filtrarPorServicio(nivel: NivelServicio): CatalogoTransporte[] {
    return CATALOGO.filter(c => c.nivelServicio === nivel);
}

function calcularTarifa(distancia: number, tipo: TipoVehiculo): number {
    const vehiculo = buscarPorTipo(tipo);
    if (!vehiculo) return 0;
    return Math.round(vehiculo.costoKm * distancia);
}

function compararVelocidades(tipo1: TipoVehiculo, tipo2: TipoVehiculo): string {
    const v1 = buscarPorTipo(tipo1);
    const v2 = buscarPorTipo(tipo2);
    if (!v1 || !v2) return "Tipo no encontrado";
    return v1.velocidadPromedio > v2.velocidadPromedio
        ? `${v1.nombre} es más rápido`
        : v1.velocidadPromedio < v2.velocidadPromedio
        ? `${v2.nombre} es más rápido`
        : "Velocidad igual";
}

// --- Mostrar catálogo ---
console.log("=== Catálogo de Tipos de Transporte ===\n");

CATALOGO.forEach(c => {
    console.log(`  ${c.tipo.toUpperCase()}: ${c.nombre}`);
    console.log(`    ${c.descripcion}`);
    console.log(`    Capacidad: ${c.capacidadMinima}-${c.capacidadMaxima} pasajeros`);
    console.log(`    Velocidad promedio: ${c.velocidadPromedio} km/h`);
    console.log(`    Costo por km: $${c.costoKm}`);
    console.log(`    Nivel: ${c.nivelServicio}`);
    console.log();
});

// --- Búsquedas ---
console.log("--- Búsqueda por Tipo ---");
let busInfo = buscarPorTipo("bus");
console.log(`Bus: ${busInfo?.nombre} (${busInfo?.velocidadPromedio} km/h)`);

console.log("\n--- Filtrar por Servicio Premium ---");
filtrarPorServicio("premium").forEach(c => {
    console.log(`  ${c.nombre}: $${c.costoKm}/km`);
});

// --- Cálculos ---
console.log("\n--- Tarifas para 15 km ---");
(["bus", "taxi", "brt", "metro"] as TipoVehiculo[]).forEach(tipo => {
    let tarifa = calcularTarifa(15, tipo);
    console.log(`  ${tipo}: $${tarifa}`);
});

// --- Comparaciones ---
console.log("\n--- Comparación de Velocidades ---");
console.log(compararVelocidades("bus", "taxi"));
console.log(compararVelocidades("metro", "tranvia"));
console.log(compararVelocidades("brt", "microbus"));

// --- Estadísticas ---
console.log("\n--- Estadísticas del Catálogo ---");
let capacidadTotal = CATALOGO.reduce((sum, c) => sum + c.capacidadMaxima, 0);
let costoPromedio = CATALOGO.reduce((sum, c) => sum + c.costoKm, 0) / CATALOGO.length;

console.log(`  Total de tipos: ${CATALOGO.length}`);
console.log(`  Capacidad máxima total: ${capacidadTotal} pasajeros`);
console.log(`  Costo promedio por km: $${costoPromedio.toFixed(0)}`);
console.log(`  Tipo más capaz: Metro (2000 pasajeros)`);
console.log(`  Tipo más económico: Metro ($100/km)`);
console.log(`  Tipo más rápido: BRT (40 km/h promedio)`);
