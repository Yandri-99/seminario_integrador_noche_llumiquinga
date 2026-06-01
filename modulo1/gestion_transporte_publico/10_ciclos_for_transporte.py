print("Ciclo for - Transporte")
print("for basico - paradas")

for i in range(1, 6):
    print(f"Parada {i}")

paradas = ["Norte", "Centro", "Sur", "Este", "Oeste"]
for parada in paradas:
    print(parada)

print("Control de interrupcion")
for i in range(1, 10):
    if i == 3:
        continue
    if i == 7:
        break
    print(f"Bus {i}")
else:
    print("Terminando el ciclo de buses")

print("for con range step")
for i in range(1, 10, 2):
    print(f"Ruta alternativa {i}")

print("for con range regresivo")
for i in range(10, 0, -1):
    print(f"Minuto {i} para salida")

print("for con enumerate")
buses = ["Bus-001", "Bus-002", "Bus-003"]
for indice, bus in enumerate(buses):
    print(indice, bus)

print("for con zip")
capacidades = [40, 50, 25]
for bus, capacidad in zip(buses, capacidades):
    print(bus, capacidad)

print("for anidados - horarios")
for i in range(1, 4):
    for x in range(1, 4):
        print(f"Ruta {i}, Horario {x}")

cantidad = int(input("Ingrese cantidad de paradas: "))
suma = 0
for i in range(1, cantidad + 1):
    nota = float(input(f"Distancia parada {i}: "))
    suma += nota
promedio = suma / cantidad
print("Distancia promedio:", promedio)
if promedio >= 2:
    print("Ruta larga")
else:
    print("Ruta corta")
