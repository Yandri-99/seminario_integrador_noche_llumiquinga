// ============================================
// MP_23: Funciones con Rest Parameters - Múltiples Paradas
// ============================================

// --- Rest parameters: recibir múltiples argumentos ---
function crearRuta(codigo: string, ...paradas: string[]): void {
    console.log(`=== Ruta ${codigo} ===`);
    console.log(`Total de paradas: ${paradas.length}`);
    paradas.forEach((parada, i) => {
        console.log(`  ${i + 1}. ${parada}`);
    });
}

console.log("--- Crear Rutas ---");
crearRuta("RT-01", "Terminal", "Plaza", "Hospital", "Universidad");
crearRuta("RT-02", "Centro", "Norte", "Aeropuerto");

// --- Rest con cálculos ---
function calcularDistanciaTotal(distanciaBase: number, ...tramos: number[]): number {
    let total = distanciaBase;
    tramos.forEach(tramo => total += tramo);
    return total;
}

console.log("\n--- Distancia Total ---");
let distanciaTotal = calcularDistanciaTotal(5, 3.2, 4.8, 7.1);
console.log(`Distancia base: 5 km`);
console.log(`Tramos adicionales: 3.2 + 4.8 + 7.1 km`);
console.log(`Total: ${distanciaTotal} km`);

// --- Rest para registrar múltiples eventos ---
function registrarEventos(hora: string, ...eventos: string[]): void {
    console.log(`\n[${hora}]`);
    eventos.forEach(evento => {
        console.log(`  • ${evento}`);
    });
}

console.log("--- Registro de Eventos ---");
registrarEventos("08:00",
    "Bus ABC-123 inició ruta",
    "32 pasajeros abordaron",
    "Nivel de combustible: 85%"
);

registrarEventos("08:15",
    "Parada en Hospital",
    "8 pasajeros subieron",
    "3 pasajeros bajaron"
);

// --- Rest para múltiples tarifas ---
function calcularIngresos(
    concepto: string,
    ...pasajes: { tipo: string; cantidad: number; tarifa: number }[]
): number {
    let total: number = 0;
    
    console.log(`\n--- ${concepto} ---`);
    pasajes.forEach(p => {
        let subtotal: number = p.cantidad * p.tarifa;
        total += subtotal;
        console.log(`  ${p.tipo}: ${p.cantidad} × $${p.tarifa} = $${subtotal.toLocaleString()}`);
    });
    
    console.log(`  Total: $${total.toLocaleString()}`);
    return total;
}

console.log("\n--- Cálculo de Ingresos ---");
calcularIngresos("Ingresos del Viaje 1",
    { tipo: "Regulares", cantidad: 20, tarifa: 2500 },
    { tipo: "Estudiantes", cantidad: 8, tarifa: 1250 },
    { tipo: "Adultos mayores", cantidad: 4, tarifa: 1000 }
);

// --- Rest para verificar múltiples condiciones ---
function verificarBus(
    placa: string,
    ...condiciones: { nombre: string; valor: boolean }[]
): void {
    console.log(`\n--- Verificación del Bus ${placa} ---`);
    let todosCumplen: boolean = true;
    
    condiciones.forEach(cond => {
        let estado = cond.valor ? "✓" : "✗";
        console.log(`  ${estado} ${cond.nombre}: ${cond.valor}`);
        if (!cond.valor) todosCumplen = false;
    });
    
    console.log(`  Resultado: ${todosCumplen ? "APROBADO" : "RECHAZADO"}`);
}

verificarBus("ABC-123",
    { nombre: "Motor funcional", valor: true },
    { nombre: "Combustible > 20%", valor: true },
    { nombre: "Puertas operativas", valor: false },
    { nombre: "Documentación vigente", valor: true }
);

// --- Rest para crear flota ---
function crearFlota(
    empresa: string,
    ...buses: { placa: string; capacidad: number; ruta: string }[]
): void {
    console.log(`\n--- Flota de ${empresa} ---`);
    console.log(`Total de buses: ${buses.length}`);
    buses.forEach(bus => {
        console.log(`  🚌 ${bus.placa} | Cap: ${bus.capacidad} | ${bus.ruta}`);
    });
}

crearFlota("TransMunicipio",
    { placa: "ABC-123", capacidad: 40, ruta: "Ruta 1" },
    { placa: "DEF-456", capacidad: 50, ruta: "Ruta 2" },
    { placa: "GHI-789", capacidad: 35, ruta: "Ruta 3" }
);
