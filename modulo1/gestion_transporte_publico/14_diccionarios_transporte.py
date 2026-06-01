print("Diccionarios - Transporte")
print("Crear Diccionarios")
vacio = {}
bus = {"codigo": "BUS-001", "capacidad": 40, "ruta": "Quito"}
config = dict(chofer="Carlos", turno="Matutino")

print(bus["codigo"])
bus["codigo"] = "BUS-002"
print(bus)
del bus["ruta"]
print(bus)

print("codigo" in bus)
print("capacidad" in bus)

print(bus.keys())
print(bus.values())
print(bus.items())

for clave, valor in bus.items():
    print(f"clave: {clave}, valor: {valor}")
