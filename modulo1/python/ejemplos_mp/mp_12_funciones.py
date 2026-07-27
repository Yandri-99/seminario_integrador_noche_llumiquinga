print("Funciones en Python - Transporte")


def iniciar_recorrido():
    print("Iniciando recorrido de transporte")


iniciar_recorrido()


def asignar_chofer(nombre):
    print(f"Chofer {nombre} asignado a la ruta")


asignar_chofer("Carlos")


def calcular_pasajeros(a, b):
    return a + b


print(calcular_pasajeros(15, 20))


def presentar_chofer(nombre, edad, ruta):
    print(f"Chofer {nombre}, edad: {edad}, ruta: {ruta}")


presentar_chofer("Carlos", 28, "Quito")
presentar_chofer(edad=35, ruta="Guayaquil", nombre="Luis")


def saludo_transporte(nombre, saludo="Bienvenido", puntuacion="!"):
    print(saludo, nombre, puntuacion)


saludo_transporte("Carlos", "Buen viaje", "...")
saludo_transporte("Juan", puntuacion="...")
saludo_transporte("Pedro", "Buenas tardes")


def sumar_pasajeros(*args):
    print(f"Pasajeros recibidos {args}")
    return sum(args)


print(sumar_pasajeros(10, 20, 30))
print(sumar_pasajeros(5, 10, 15, 20, 25))


def mostrar_ruta(titulo, *paradas):
    print(f"Ruta: {titulo}")
    for parada in paradas:
        print(f"- {parada}")


mostrar_ruta("Ruta Norte", "Parque", "Centro", "Mercado")


def configurar_bus(**kwargs):
    print(f"Configuracion del bus: {kwargs}")
    for clave, valor in kwargs.items():
        print(f"{clave} - {valor}")


configurar_bus(chofer="Carlos", ruta="101", capacidad=40, turno="Matutino")


def configurar_viaje(chofer, *paradas, expreso=False, **opciones):
    print(f"Configuracion de viaje")
    print(f"Chofer: {chofer}")
    print(f"Paradas: {paradas}")
    print(f"Expreso: {expreso}")
    print(f"Opciones: {opciones}")


configurar_viaje("Carlos", "Parque", "Centro", "Sur", expreso=True, climatizado=True, wifi=True)


def minmax_pasajeros(numeros):
    return min(numeros), max(numeros)


minimo, maximo = minmax_pasajeros([30, 45, 20, 50, 35])
print("minimo:", minimo, "maximo:", maximo)


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
stats = analizar_viajes(datos)
print(f"Total pasajeros: {stats['total']}")
print(f"Promedio: {stats['media']}")
print(f"Minimo: {stats['minimo']} - Maximo: {stats['maximo']}")
print(f"Cantidad viajes: {stats['count']}")


suma_pasaje = lambda a, b: a + b
print(suma_pasaje(1.50, 2.00))
