cadena_string = "Hola", "Desde", "La", "UTE"
print(cadena_string)

print("Hola", "Desde", "La", "UTE")
print("Hola", "Desde", "La", "UTE", sep=", ")
print("Uno", "Dos", "Tres", "4", sep=" - ")
print("Uno", "Dos", "Tres", "4", end="")
print("Uno", "Dos", "Tres", "4", sep=" - ")
print("Uno", "Dos", "Tres", "4", end=" | ")
print("Uno", "Dos", "Tres", "4", end=" | ")

nombre = "Edison"
edad = 28
print(nombre, edad)
nombre_edad=f"Nombre: {nombre}, Edad: {edad}"
print(nombre_edad)
print(f"Nombre: {nombre}, Edad: {edad}")
print(f"Doble de edad: {edad} es {edad * 2}")
print(f"{'Yandri':>15}")#Alineado a la derecha
pi=3.14159
print(f"{pi:.2f}")
print(f"{10000000:,}")