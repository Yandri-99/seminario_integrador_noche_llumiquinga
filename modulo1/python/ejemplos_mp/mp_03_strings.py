datos_ruta = "Ruta", "101", "Norte", "Sur"
print(datos_ruta)

print("Ruta", "101", "Norte", "Sur")
print("Ruta", "101", "Norte", "Sur", sep=" -> ")
print("Parada", "Uno", "Dos", "Tres", sep=" - ")
print("Origen", "Destino", "Tiempo", sep=" | ", end=" | ")

nombre_chofer = "Edison"
horas_trabajadas = 8
print(nombre_chofer, horas_trabajadas)
info_chofer = f"Chofer: {nombre_chofer}, Horas: {horas_trabajadas}"
print(info_chofer)
print(f"Chofer: {nombre_chofer}, Horas: {horas_trabajadas}")
print(f"Tiempo extra: {horas_trabajadas - 8} horas")
print(f"{'Ruta 101':>15}")
distancia = 12.5
print(f"{distancia:.2f} km de recorrido")
print(f"{5000:,} pasajeros transportados/mes")
