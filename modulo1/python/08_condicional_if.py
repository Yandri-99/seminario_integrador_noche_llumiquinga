print("Condicional if")
print("if simple")
stock=3
if stock>0:
    print("Productos disponibles")

print("if else - dis caminos")
saldo=25
if saldo>50:
    print("Compra permitida")
else:
    print("Salso insuficiente")

print("if multiples condiciones")
temperatura=32
if temperatura>10:
    print("Hace Frio")
elif temperatura<25:
    print("Clima Templado")
else:
    print("Hace Calor")

print("if condiciones anidadas")
conexion=True
token_valido=False
if conexion:
    if token_valido:
        print("Acceso a la api")
    else:
        print("Token invalido")
else:
    print("Sin conexion")

print("if con operadores logicos")
documento=True
pago=True
if documento and pago:
    print("incripcion confirmada")

es_vip=False
tiene_invitacion=True
if es_vip or tiene_invitacion:
    print("Puede entrar al evento")

bloqueador=False
if not bloqueado:
    print("Usuario habilitado")