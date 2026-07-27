// ============================================
// MP_16: Bucle For-In - Propiedades del Bus
// ============================================

// --- For-in con objeto: propiedades del bus ---
let bus: {
    placa: string;
    capacidad: number;
    ruta: string;
    activo: boolean;
    kilometraje: number;
} = {
    placa: "ABC-123",
    capacidad: 40,
    ruta: "Ruta 5 - Centro",
    activo: true,
    kilometraje: 125000
};

console.log("=== Propiedades del Bus ===");
for (const propiedad in bus) {
    console.log(`  ${propiedad}: ${bus[propiedad as keyof typeof bus]}`);
}

// --- For-in con string: caracteres de placa ---
let placa: string = "ABC-123";
console.log("\n--- Análisis de Placa ---");
for (const caracter in placa) {
    console.log(`  Posición ${caracter}: "${placa[Number(caracter)]}"`);
}

// --- For-in con array: índices ---
let paradas: string[] = ["Terminal", "Plaza", "Hospital", "Universidad"];
console.log("\n--- Índices de Paradas ---");
for (const indice in paradas) {
    console.log(`  [${indice}] ${paradas[Number(indice)]}`);
}

// --- For-in para verificar propiedades ---
let conductor: { nombre: string; licencia: string; telefono?: string } = {
    nombre: "Carlos Mendoza",
    licencia: "B2-12345"
};

console.log("\n--- Verificación de Datos del Conductor ---");
let propiedadesRequeridas: string[] = ["nombre", "licencia"];

for (const propiedad of propiedadesRequeridas) {
    if (propiedad in conductor) {
        console.log(`  ✓ ${propiedad}: "${conductor[propiedad as keyof typeof conductor]}"`);
    } else {
        console.log(`  ✗ ${propiedad}: FALTANTE`);
    }
}

// --- For-in con objeto anidado ---
let rutaInfo: {
    codigo: string;
    coordenadas: { inicio: string; fin: string };
    paradas: string[];
} = {
    codigo: "RT-05",
    coordenadas: { inicio: "Terminal", fin: "Aeropuerto" },
    paradas: ["T1", "P2", "H3", "U4"]
};

console.log("\n--- Información de Ruta ---");
for (const clave in rutaInfo) {
    let valor = rutaInfo[clave as keyof typeof rutaInfo];
    if (typeof valor === "object" && valor !== null) {
        console.log(`  ${clave}:`);
        for (const subClave in valor) {
            console.log(`    ${subClave}: ${valor[subClave]}`);
        }
    } else {
        console.log(`  ${clave}: ${valor}`);
    }
}

// --- For-in con Object.keys ---
console.log("\n--- Llaves del Objeto Bus ---");
let llaves = Object.keys(bus);
console.log(`  Llaves: [${llaves.join(", ")}]`);

// --- For-in con Object.values ---
console.log("\n--- Valores del Objeto Bus ---");
let valores = Object.values(bus);
valores.forEach(valor => {
    console.log(`  ${typeof valor}: ${valor}`);
});

// --- For-in con Object.entries ---
console.log("\n--- Entradas del Objeto Bus ---");
let entradas = Object.entries(bus);
entradas.forEach(([llave, valor]) => {
    console.log(`  ${llave} → ${valor}`);
});
