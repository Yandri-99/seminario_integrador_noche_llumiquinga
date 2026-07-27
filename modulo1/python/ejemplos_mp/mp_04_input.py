nombre_chofer = input("Ingrese el nombre del chofer: ")
print(f"Bienvenido, {nombre_chofer}")

edad_chofer_str = input("Ingrese la edad del chofer: ")
print(f"El chofer tiene, {edad_chofer_str} anios")
edad_chofer = int(edad_chofer_str)
print(f"Anios restantes para jubilacion: {65 - edad_chofer}")
