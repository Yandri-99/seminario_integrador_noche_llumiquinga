print("Manipulacion de listas - Transporte")

vacia = []
print(vacia)

print("Buses")
buses = ["Bus-001", "Bus-002", "Bus-003", "Bus-004", "Bus-005"]
print(buses)
mixta = [1, 3, "Ruta Norte", True, "Activo", None, 3.14]
print(mixta)

print("Acceso a elementos")
print(buses[0])
print(buses[-1])
print(buses[1:3])
print(buses[::-1])

print("CRUD de una lista")
rutas = ["Norte", "Centro", "Sur", "Este"]
rutas.insert(1, "Noreste")
print(rutas)
rutas.append("Oeste")
print(rutas)
rutas.extend(["Noroccidente", "Suroriente"])
print(rutas)
rutas[0] = "Norte - Terminal"
print(rutas)
rutas.remove("Norte - Terminal")
eliminando = rutas.pop()
print(eliminando)
print(rutas)
eliminando = rutas.pop(2)
print(eliminando)
print(rutas)
del rutas[0]
print(rutas)

print("Ordenar una lista")
distancias = [3, 2, 1, 5, 6, 7, 9]
print(distancias)
distancias.sort()
print(distancias)
distancias.sort(reverse=True)
print(distancias)
ordenada = sorted(distancias)
print(ordenada)
print(distancias)
