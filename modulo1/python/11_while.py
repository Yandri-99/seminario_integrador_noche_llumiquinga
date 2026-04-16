print("Ciclo While")
contador=1
while contador<=5:
    print(contador)
    contador+=1

dato=""
while dato!="salir":
    dato = input("escribe algo(salir para terminar)")
    print("escribiste:", dato)

cantidad=int(input("cuantos productos compro"))
total=0
contador=0
while contador<=cantidad:
    precio=float(input(f"precio del prodcuto {contador}"))
    total+=precio
    contador+=1
print("total", total)
if total >= 100:
    print("aplica descuento")
else:
    print("no aplica descuento")