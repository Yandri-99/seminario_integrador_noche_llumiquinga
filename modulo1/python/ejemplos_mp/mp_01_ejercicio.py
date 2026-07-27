tipo_usuario = input("Ingrese tipo de usuario (estudiante/pasajero/premium): ")
pagado = input("Tiene pasaje? (s/n): ")

if tipo_usuario == "premium":
    if pagado == "s":
        print("Acceso completo al servicio de transporte")
    else:
        print("Debe comprar su pasaje")
else:
    print("Acceso limitado a rutas basicas")
