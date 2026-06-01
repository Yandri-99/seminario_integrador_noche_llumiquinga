datos_bus = "Ruta", "101", "Norte", "Sur"
print(datos_bus)

print("Ruta", "101", "Norte", "Sur")
print("Ruta", "101", "Norte", "Sur", sep=" -> ")
print("Parada", "Uno", "Dos", "Tres", sep=" - ")
print("Parada", "Uno", "Dos", "Tres", end="")
print("Parada", "Uno", "Dos", "Tres", sep=" - ")
print("Origen", "Destino", "Tiempo", sep=" | ", end=" | ")
print("Origen", "Destino", "Tiempo", sep=" | ", end=" | ")

nombre_chofer = "Edison"
edad_chofer = 28
print(nombre_chofer, edad_chofer)
info_chofer = f"Chofer: {nombre_chofer}, Edad: {edad_chofer}"
print(info_chofer)
print(f"Chofer: {nombre_chofer}, Edad: {edad_chofer}")
print(f"Doble de edad del chofer: {edad_chofer} es {edad_chofer * 2}")
print(f"{'Ruta 101':>15}")
distancia = 12.5
print(f"{distancia:.2f} km")
print(f"{10000:,} pasajeros/mes")
