print("Match -Case")
comando=input("comando iniciar/parar/reiniciar")
match comando:
    case "iniciar":
        print("Sistema iniciando....")
    case "parar":
        print("Sistema deteniendose....")
    case "reiniciar":
        print("Sistema reiniciando....")
    case _:
        print(f"Comando {comando} no valido")

print("Match - con condiciones")
numero=int(input("Incluya numero"))
match numero:
    case n if n<0:
        print(f"Numero {n} es negativo")
    case 0:
        print("es cero")
    case n if n %2==0:
        print(f"el numero {n} es positivo y par")
    case n:
        print(f"el numero {n} es positivo y impar")