// ============================================
// MP_27: Types - Tipos para Transporte
// ============================================

// --- Type aliases ---
type BusID = string;
type RouteCode = string;
type FareType = "regular" | "estudiante" | "adultoMayor" | "discapacidad";
type BusStatus = "activo" | "inactivo" | "mantenimiento";
type Coordinate = { lat: number; lng: number };

// --- Uso de types ---
let miBus: BusID = "ABC-123";
let miRuta: RouteCode = "RT-05";
let tipoTarifa: FareType = "estudiante";
let estadoBus: BusStatus = "activo";
let ubicacion: Coordinate = { lat: 4.7109, lng: -74.0720 };

console.log("=== Tipos de Transporte ===");
console.log(`Bus: ${miBus}`);
console.log(`Ruta: ${miRuta}`);
console.log(`Tarifa: ${tipoTarifa}`);
console.log(`Estado: ${estadoBus}`);
console.log(`Ubicación: (${ubicacion.lat}, ${ubicacion.lng})`);

// --- Type con union ---
type UnidadTransporte = "bus" | "taxi" | "microbus" | "metro";
type DiasOperacion = "lunes" | "martes" | "miércoles" | "jueves" | "viernes" | "sábado" | "domingo";

function registrarUnidad(tipo: UnidadTransporte, placa: string): void {
    console.log(`  ${tipo.toUpperCase()} ${placa} registrado`);
}

console.log("\n--- Unidades de Transporte ---");
registrarUnidad("bus", "ABC-123");
registrarUnidad("taxi", "DEF-456");
registrarUnidad("microbus", "GHI-789");

// --- Type con intersection ---
type DatosBase = {
    id: string;
    nombre: string;
};

type ConUbicacion = DatosBase & {
    coordenadas: Coordinate;
};

type ConHorario = DatosBase & {
    horaApertura: string;
    horaCierre: string;
};

let terminal: ConUbicacion = {
    id: "T001",
    nombre: "Terminal Central",
    coordenadas: { lat: 4.7109, lng: -74.0720 }
};

let oficina: ConHorario = {
    id: "O001",
    nombre: "Oficina de Atención",
    horaApertura: "08:00",
    horaCierre: "17:00"
};

console.log("\n--- Datos con Intersección ---");
console.log(`Terminal: ${terminal.nombre} (${terminal.coordenadas.lat})`);
console.log(`Oficina: ${oficina.nombre} (${oficina.horaApertura} - ${oficina.horaCierre})`);

// --- Type con mapped types ---
type Tarifas = {
    regular: number;
    estudiante: number;
    adultoMayor: number;
    discapacidad: number;
};

let tarifasRuta: Tarifas = {
    regular: 2500,
    estudiante: 1250,
    adultoMayor: 1000,
    discapacidad: 750
};

console.log("\n--- Tarifas ---");
Object.entries(tarifasRuta).forEach(([tipo, valor]) => {
    console.log(`  ${tipo}: $${valor}`);
});

// --- Type con utility types ---
type DatosBusOpcional = Partial<{
    placa: string;
    capacidad: number;
    ruta: string;
    conductor: string;
}>;

type DatosBusRequerido = Required<{
    placa: string;
    capacidad: number;
}>;

let busParcial: DatosBusOpcional = { placa: "ABC-123" };
let busCompleto: DatosBusRequerido = { placa: "DEF-456", capacidad: 40 };

console.log("\n--- Bus Parcial ---");
console.log(busParcial);

console.log("\n--- Bus Completo ---");
console.log(busCompleto);

// --- Type readonly ---
type ConfiguracionRuta = Readonly<{
    codigo: string;
    nombre: string;
    distancia: number;
}>;

let configRuta: ConfiguracionRuta = {
    codigo: "RT-05",
    nombre: "Centro-Norte",
    distancia: 15.5
};

console.log(`\nRuta configurada: ${configRuta.codigo}`);
// configRuta.codigo = "RT-06"; // Error: Cannot assign to 'codigo' because it is a read-only property

// --- Type con template literals ---
type Horario = `${string}:${string}`;
type CodigoRuta = `RT-${number}`;

let hora: Horario = "14:30";
let codigoRT: CodigoRuta = "RT-5";

console.log(`\nHorario: ${hora}`);
console.log(`Código: ${codigoRT}`);

// --- Type con funciones ---
type FuncionTarifa = (distancia: number, tipo: FareType) => number;
type FuncionCallback = (mensaje: string) => void;

const calcularTarifaFunc: FuncionTarifa = (dist, tipo) => {
    let base = 2500 + dist * 150;
    let descuentos: Record<FareType, number> = {
        regular: 1,
        estudiante: 0.5,
        adultoMayor: 0.4,
        discapacidad: 0.3
    };
    return base * descuentos[tipo];
};

console.log(`\nTarifa calculada: $${calcularTarifaFunc(10, "estudiante")}`);
