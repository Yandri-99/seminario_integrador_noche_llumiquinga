print("Match - Case en Transporte")
comando = input("Comando: iniciar/parar/mantenimiento: ")
match comando:
    case "iniciar":
        print("Bus iniciando recorrido...")
    case "parar":
        print("Bus deteniendo recorrido...")
    case "mantenimiento":
        print("Bus entrando a mantenimiento...")
    case _:
        print(f"Comando {comando} no valido")

print("Match - con condiciones en Transporte")
velocidad = int(input("Ingrese velocidad del bus: "))
match velocidad:
    case n if n < 10:
        print(f"Velocidad {n} km/h - muy lenta")
    case 0:
        print("Bus detenido")
    case n if n <= 50:
        print(f"Velocidad {n} km/h - velocidad normal")
    case n:
        print(f"Velocidad {n} km/h - exceso de velocidad")
