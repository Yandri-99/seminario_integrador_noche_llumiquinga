#Funcion Basica
from pstats import Stats
from socket import timeout


print("Funciones en python")
print("Funcion basica")
def saludar():
    print("Hola desde la ute")
    
saludar()

#Parametro
print("Funcion con parametro")
def saludarConNombre(nombre):
    print(f"Hola {nombre}, Que tal")
    
saludarConNombre("Yandri")
saludarConNombre("Maria")

#Devuelve valor con return
print("funcion que devuelve valor con return")
def sumar(a, b):
    return a + b
print(sumar(5, 3))

#Posicion y por nombre
print("funcion por posicion y por nombre")
def presentar(nombre, edad, ciudad):
    print(f"Señor(a) {nombre}, edad: {edad} ciudad {ciudad}")
presentar("Yandri", 21, "Quito")
presentar("Maria", 25, "Guayaquil")
presentar(edad=40, ciudad="Coro", nombre="Pedro")

#Parametros con valores por defecto
print("funcion con valores de parametros por defecto")
def saludo_con_valores(nombre, saludo="Hola", puntuacion="!"):
    print(saludo, nombre, puntuacion)
saludo_con_valores("Yandri", "Buenas noches", "...")
saludo_con_valores("Juan", puntuacion="...")
saludo_con_valores("Carlos", "Buenas tardes")

#Parametros posicionales
print("funciones con parametros posicionales")
def sumar_todos(*args):
    print(f"Parametros recibidos {args}")
    return sum(args)
print(sumar_todos(1, 2, 3))
print(sumar_todos(1, 2, 3, 4, 5, 6, 7))
print(sumar_todos(10, 20, 30))

#Parametros combinados con posicionales
print("funcion parametros combinados con posicionales")
def mostra_info(titulo, *datos):
    print(f"Parametros Recibidos {datos} , {titulo}")
    print(titulo)
    for dato in datos:
        print(f"- {dato}")
mostra_info("Estudiantes", "Yandri", "Maria", "Pedro")

#Parametros con clave valor variables
print("funcion parametros clave valor variables")
def crear_perfil(**kwargs):
    print(f"Parametros Recibidos {kwargs}")
    for clave, valor in kwargs.items():
        print(f"{clave} - {valor}")
crear_perfil(nombre="Yandri", apellido="Llumiquinga", edad=21, ciudad="Quito")

#Parametros con Combinacion con todos los tipos
print("funcion parametros combinacion con todos los tipos")
def configurar(host, *puertos, debug=False, **opciones):
    print(f"Configuracion")
    print(f"Host: {host}")
    print(f"Puertos: {puertos}")
    print(f"Debug: {debug}")
    print(f"Opciones: {opciones}")
configurar("localhost", 80,443,8080, debug=True, timeout=30, ssl=True)

#Devolver multiples valores
print("Devolver multiples valores")
def minmax(numeros):
    return min(numeros), max(numeros)
minimo, maximo= minmax([3,23,45654,3,2,3,45])
print("minimo:", minimo, "maximo", maximo)
_, maximo= minmax([3,23,4,5,654,45])
print("maximo", maximo)
minimo, _= minmax([3,23,4,5,65,4,45])
print("minimo", minimo)

#Devolver diccionar en el caso de muchos valores
print("Devolver diccionar en el caso de muchos valores")
def analizar(numeros):
    total=sum(numeros)
    n=len(numeros)
    return {
        "total": total,
        "media": total/n if n>0 else 0,
        "minimo": min(numeros) if numeros else None,
        "maximo": max(numeros) if numeros else None,
        "count": n
    }
datos= [1,2,44,5,5,6,1,44,7,8,9,10]
Stats=analiar(datos)
print(f"Total: {Stats['total']}")
print(f"Media: {Stats['media']}")
print(f"Minimo: {Stats['minimo']}-{Stats['maximo']}")
print(f"Cantidad: {Stats['count']}")

#Funcion lambda
print("Funcion lambda")
def doble(numero):
    return numero * 2
duplicar = lambda x: x * 2
doble(2)
duplicar(3)

#Funciones lambda
print("Funciones lambda")
def doble(numero):
    return numero * 2
duplicar=lambda x: x * 2
print(doble(2))
print(duplicar(3))
suma=lambda a,b: a+b
print(suma(4,5))