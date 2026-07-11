// Concepto puro
const numeros: number[] = [1, 2, 3, 4];

// forEach: para "hacer algo" con cada elemento
numeros.forEach((n) => console.log(n * 10));  // 10, 20, 30, 40
numeros.forEach((n) => {
    console.log(n * 10);
    console.log(n * 2);
    console.log(n * 5)
}); 

// map: para CREAR una lista transformada
const dobles: number[] = numeros.map((n) => n * 2);
console.log(dobles);  // [2, 4, 6, 8]

//ejemplo aplicado
const emails: string[] = ["  ANA@MAIL.COM ", "Luis@Mail.com", " PEPE@MAIL.COM"];
const limpios: string[] = emails.map((e) => e.trim().toLowerCase());
console.log(limpios);  // ["ana@mail.com", "luis@mail.com", "pepe@mail.com"]

// forEach para reportar, map para transformar
limpios.forEach((usuario, i) => console.log(`Usuario ${i + 1}: ${usuario}`));

///
const precios: number[] = [100, 250, 80, 500];

precios.forEach((n) => console.log(n * 10));  
precios.forEach((n) => {
    console.log(n * 10);
    console.log(n * 2);
    console.log(n * 5)
}); 

const iva: number[] = precios.map((p) => Number((p * 0.19).toFixed(2)));
iva.forEach((precio) => console.log(precio)); 