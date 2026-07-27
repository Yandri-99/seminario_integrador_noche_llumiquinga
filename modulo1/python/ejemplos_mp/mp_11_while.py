print("Ciclo While - Transporte")
contador = 1
while contador <= 5:
    print(f"Viaje {contador}")
    contador += 1

dato = ""
while dato != "salir":
    dato = input("Estado del bus (escriba 'salir' para terminar): ")
    print("Estado:", dato)

cantidad = int(input("Cuantos viajes realizo el bus: "))
total = 0
contador = 0
while contador < cantidad:
    precio = float(input(f"Pasajeros del viaje {contador + 1}: "))
    total += precio
    contador += 1
print("Total de pasajeros:", total)
if total >= 100:
    print("Ruta de alta demanda")
else:
    print("Ruta de baja demanda")
