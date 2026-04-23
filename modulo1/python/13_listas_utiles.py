#Manipulacion de listas - crear listas
print("Manipulacion de listas")
print("Crear listas")
#Vacia
vacia = []
print(vacia)

#Numeros
print("Nombres")
nombres=["Juan", "Juana", "Jose", "Yandri"]

#Nombres
print(nombres)
mixta=[1,3,"Hello", True,"World",None,3.14]

#Mixta
print(mixta)
anidada=[[1,2,3],555,[4,5,[7,8,9]]]

#Anidada
print(anidada)

#Elementos de una lista
print("Acceso a elementos de una lista")
print(nombres[0])
print(nombres[-1])
print(nombres[1:3])
print(nombres[::-1])

#Crud
print("CRUD de una lista")
frutas=["naranja","melon","banana","durazno"]
#agregar
frutas.insert(1,"pera")
print(frutas)
frutas.append("uva")
print(frutas)
frutas.extend(["kiwi","mango"])
print(frutas)
#modificar
frutas[0]="toronja"
print(frutas)
#eliminar elementos
frutas.remove("toronja")
eiminando=frutas.pop()
print(eiminando)
print(frutas)
eliminando=frutas.pop(2)
print(eliminando)
print(frutas)
del frutas[0]
print(frutas)

#Ordenar
print("Ordenar una lista")
numeros_desordenados=[3,2,1,5,6,7,9]
print(numeros_desordenados)
#
numeros_desordenados.sort()
print(numeros_desordenados)
#
numeros_desordenados.sort(reverse=True)
print(numeros_desordenados)
#
ordenada=sorted(numeros_desordenados)
print(ordenada)
print(numeros_desordenados)
