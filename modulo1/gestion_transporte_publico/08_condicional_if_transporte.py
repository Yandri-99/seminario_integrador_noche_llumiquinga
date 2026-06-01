print("Condicional if - Transporte")
print("if simple")
pasajeros = 30
if pasajeros > 0:
    print("Bus con pasajeros a bordo")

print("if else - dos caminos")
combustible = 25
if combustible > 50:
    print("Combustible suficiente para la ruta")
else:
    print("Combustible insuficiente, recargar")

print("if multiples condiciones")
velocidad = 62
if velocidad < 30:
    print("Velocidad muy baja")
elif velocidad < 60:
    print("Velocidad normal")
else:
    print("Exceso de velocidad")

print("if condiciones anidadas")
conexion_gps = True
ruta_valida = False
if conexion_gps:
    if ruta_valida:
        print("Siguiendo ruta planificada")
    else:
        print("Ruta no valida, recalcular")
else:
    print("Sin conexion GPS")

print("if con operadores logicos")
licencia = True
curso_completado = True
if licencia and curso_completado:
    print("Chofer habilitado para conducir")

es_rapido = False
tiene_prioridad = True
if es_rapido or tiene_prioridad:
    print("Puede tomar la via rapida")

suspendido = False
if not suspendido:
    print("Chofer habilitado")
