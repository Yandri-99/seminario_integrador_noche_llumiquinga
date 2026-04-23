#
print("Diccionarios")
print("Crear Diccionarios")
vacio={}
persona={"nombre":"Pedro","edad":26,"ciudad":"Quito"}
config=dict(host="localhost",puerto=5432)

#acceso
print(persona["nombre"])

#modificar
persona["nombre"] = "Jose"
print(persona)
del persona["edad"]
print(persona)

#verificar existencias
print("nombre" in persona)
print("ciudad" in persona)

#Metodos esenciales
print(persona.keys())
print(persona.values())
print(persona.items())

#interar
for clave, valor in persona.items():
    print(f"clave: {clave}, valor: {valor}")
    
