print("ciclo for")
print("for basico")

for i in range(1,6):
    print(i)

frutas["naranja","banana", "manzana"]
for fruta in frutas:
    print(fruta)

print("Control de interrupcion")
for i in range(1,10):
    if i==3: continue
    if i==7: break
    print(i)
else:
    print("Terminando el ciclo")

print("for con range step")
for i in range(1,10,2):
    print(i)

print("for con range regresivo")
for i in range(10,0,-1):
    print(i)

print("for con enumerate")
nombres = ["Juan", "Pedro", "Maria"]
for indice, nombre in enumerate(nombres):
    print(indice, nombre)

print("for con zip")
edades=[18,11,25,56]
for nombre, edad in zip(nombres,edades):
    print(nombre, edad)

print("for anidados")

for i in range(1,4):
    for x in range(1,4):
        print(i,x)

cantidad=int(input(ingrese cantidad de notas))
suma=0
for i in range(1,cantidad+1):
    nota=float(input(f"nota{i}:"))
promedio=suma/cantidad
print("Promedio:",promedio)
if promedio >=7:
    print("Aprobado")
else:
    print("Reprueba")