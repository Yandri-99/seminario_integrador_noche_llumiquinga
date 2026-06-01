print("Funciones en python - Transporte")
print("Funcion basica")


def iniciar_recorrido():
    print("Iniciando recorrido de transporte")


iniciar_recorrido()

print("Funcion con parametro")


def asignar_chofer(nombre):
    print(f"Chofer {nombre} asignado a la ruta")


asignar_chofer("Yandri")
asignar_chofer("Maria")

print("funcion que devuelve valor con return")


def calcular_pasajeros(a, b):
    return a + b


print(calcular_pasajeros(15, 20))

print("funcion por posicion y por nombre")


def presentar_chofer(nombre, edad, ruta):
    print(f"Chofer {nombre}, edad: {edad}, ruta: {ruta}")


presentar_chofer("Yandri", 21, "Quito")
presentar_chofer("Maria", 25, "Guayaquil")
presentar_chofer(edad=40, ruta="Coro", nombre="Pedro")

print("funcion con valores de parametros por defecto")


def saludo_transporte(nombre, saludo="Bienvenido", puntuacion="!"):
    print(saludo, nombre, puntuacion)


saludo_transporte("Yandri", "Buen viaje", "...")
saludo_transporte("Juan", puntuacion="...")
saludo_transporte("Carlos", "Buenas tardes")

print("funciones con parametros posicionales")


def sumar_pasajeros(*args):
    print(f"Pasajeros recibidos {args}")
    return sum(args)


print(sumar_pasajeros(10, 20, 30))
print(sumar_pasajeros(5, 10, 15, 20, 25))
print(sumar_pasajeros(100, 200, 300))

print("funcion parametros combinados con posicionales")


def mostrar_ruta(titulo, *paradas):
    print(f"Ruta: {titulo}")
    for parada in paradas:
        print(f"- {parada}")


mostrar_ruta("Ruta Norte", "Parque", "Centro", "Mercado")

print("funcion parametros clave valor variables")


def configurar_bus(**kwargs):
    print(f"Configuracion del bus: {kwargs}")
    for clave, valor in kwargs.items():
        print(f"{clave} - {valor}")


configurar_bus(chofer="Yandri", ruta="101", capacidad=40, turno="Matutino")

print("funcion parametros combinacion con todos los tipos")


def configurar_viaje(chofer, *paradas, expreso=False, **opciones):
    print(f"Configuracion de viaje")
    print(f"Chofer: {chofer}")
    print(f"Paradas: {paradas}")
    print(f"Expreso: {expreso}")
    print(f"Opciones: {opciones}")


configurar_viaje("Yandri", "Parque", "Centro", "Sur", expreso=True, climatizado=True, wifi=True)

print("Devolver multiples valores")


def minmax_pasajeros(numeros):
    return min(numeros), max(numeros)


minimo, maximo = minmax_pasajeros([30, 45, 20, 50, 35])
print("minimo:", minimo, "maximo", maximo)
_, maximo = minmax_pasajeros([30, 45, 20, 50, 35])
print("maximo", maximo)
minimo, _ = minmax_pasajeros([30, 45, 20, 50, 35])
print("minimo", minimo)

print("Devolver diccionario con estadisticas")


def analizar_viajes(numeros):
    total = sum(numeros)
    n = len(numeros)
    return {
        "total": total,
        "media": total / n if n > 0 else 0,
        "minimo": min(numeros) if numeros else None,
        "maximo": max(numeros) if numeros else None,
        "count": n,
    }


datos = [30, 45, 20, 50, 35, 40, 25]
Stats = analizar_viajes(datos)
print(f"Total pasajeros: {Stats['total']}")
print(f"Promedio: {Stats['media']}")
print(f"Minimo: {Stats['minimo']} - Maximo: {Stats['maximo']}")
print(f"Cantidad viajes: {Stats['count']}")

print("Funcion lambda")


def doble(numero):
    return numero * 2


duplicar = lambda x: x * 2
doble(2)
duplicar(3)

print("Funciones lambda")
doble = lambda numero: numero * 2
print(doble(5))
duplicar = lambda x: x * 2
print(doble(2))
print(duplicar(3))
suma_pasaje = lambda a, b: a + b
print(suma_pasaje(1.50, 2.00))
