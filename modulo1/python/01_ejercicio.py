tipo_usuario=input("Ingrese Usuario")
pagado=input("s/n")

if tipo_usuario=="premium":
    if pagado=="s":
        print("Acceso Completo")
    else:
        print("Debe pagar")
else:
    print("Acceso Limitado")
    