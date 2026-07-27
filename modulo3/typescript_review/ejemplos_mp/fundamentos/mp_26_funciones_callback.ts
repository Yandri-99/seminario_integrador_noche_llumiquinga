// ============================================
// MP_26: Funciones Callback - Eventos de Viaje
// ============================================

// --- Callback básico: eventos de viaje ---
function iniciarViaje(
    busPlaca: string,
    callback: (mensaje: string) => void
): void {
    callback(`Bus ${busPlaca} iniciando viaje`);
}

function completarViaje(
    busPlaca: string,
    callback: (mensaje: string) => void
): void {
    callback(`Bus ${busPlaca} completó el viaje`);
}

console.log("=== Eventos de Viaje ===");
iniciarViaje("ABC-123", (msg) => console.log(`  🚀 ${msg}`));
completarViaje("ABC-123", (msg) => console.log(`  ✅ ${msg}`));

// --- Callback con datos: procesar pasajeros ---
function registrarPasajero(
    nombre: string,
    tipo: string,
    callback: (nombre: string, tarifa: number) => void
): void {
    let tarifas: { [key: string]: number } = {
        "regular": 2500,
        "estudiante": 1250,
        "adultoMayor": 1000,
        "discapacidad": 750
    };
    
    let tarifa = tarifas[tipo] || 2500;
    callback(nombre, tarifa);
}

console.log("\n--- Registro de Pasajeros ---");
registrarPasajero("Ana García", "regular", (n, t) => {
    console.log(`  ${n}: $${t}`);
});

registrarPasajero("Luis Pérez", "estudiante", (n, t) => {
    console.log(`  ${n}: $${t}`);
});

registrarPasajero("María López", "adultoMayor", (n, t) => {
    console.log(`  ${n}: $${t}`);
});

// --- Callback con error: verificar combustible ---
function verificarCombustible(
    placa: string,
    nivel: number,
    onSuccess: (mensaje: string) => void,
    onWarning: (mensaje: string) => void,
    onError: (mensaje: string) => void
): void {
    if (nivel > 50) {
        onSuccess(`Bus ${placa}: Nivel óptimo (${nivel}%)`);
    } else if (nivel > 20) {
        onWarning(`Bus ${placa}: Nivel bajo (${nivel}%)`);
    } else {
        onError(`Bus ${placa}: Nivel crítico (${nivel}%)`);
    }
}

console.log("\n--- Verificación de Combustible ---");
verificarCombustible("ABC-123", 75, 
    (m) => console.log(`  ✓ ${m}`),
    (m) => console.log(`  ⚠ ${m}`),
    (m) => console.log(`  ✗ ${m}`)
);

verificarCombustible("DEF-456", 35,
    (m) => console.log(`  ✓ ${m}`),
    (m) => console.log(`  ⚠ ${m}`),
    (m) => console.log(`  ✗ ${m}`)
);

verificarCombustible("GHI-789", 12,
    (m) => console.log(`  ✓ ${m}`),
    (m) => console.log(`  ⚠ ${m}`),
    (m) => console.log(`  ✗ ${m}`)
);

// --- Callback con timeout: temporizador de bus ---
function temporizadorParada(
    nombreParada: string,
    tiempoEspera: number,
    onInicio: () => void,
    onComplete: (nombre: string) => void
): void {
    onInicio();
    setTimeout(() => {
        onComplete(nombreParada);
    }, tiempoEspera);
}

console.log("\n--- Temporizador de Parada ---");
temporizadorParada("Hospital", 100,
    () => console.log("  ⏱ Iniciando espera en parada..."),
    (nombre) => console.log(`  ✓ Salida de ${nombre}`)
);

// --- Callback con promesa simulada ---
function buscarBus(
    placa: string,
    callback: (error: string | null, bus: { placa: string; ruta: string; activo: boolean } | null) => void
): void {
    let buses: { placa: string; ruta: string; activo: boolean }[] = [
        { placa: "ABC-123", ruta: "Ruta 1", activo: true },
        { placa: "DEF-456", ruta: "Ruta 2", activo: false }
    ];

    let encontrado = buses.find(b => b.placa === placa);
    
    if (encontrado) {
        callback(null, encontrado);
    } else {
        callback(`Bus ${placa} no encontrado`, null);
    }
}

console.log("\n--- Búsqueda de Bus ---");
buscarBus("ABC-123", (error, bus) => {
    if (error) {
        console.log(`  Error: ${error}`);
    } else {
        console.log(`  Encontrado: ${bus?.placa} en ${bus?.ruta}`);
    }
});

buscarBus("XYZ-999", (error, bus) => {
    if (error) {
        console.log(`  Error: ${error}`);
    } else {
        console.log(`  Encontrado: ${bus?.placa}`);
    }
});
