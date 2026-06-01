class Bus:
    tipo_vehiculo = "Transporte Publico"

    def __init__(self, codigo, capacidad):
        self.codigo = codigo
        self.capacidad = capacidad
        self.pasajeros_actuales = 0

    def subir_pasajeros(self, cantidad):
        if self.pasajeros_actuales + cantidad <= self.capacidad:
            self.pasajeros_actuales += cantidad
            print(f"Subieron {cantidad} pasajeros. Total: {self.pasajeros_actuales}")
        else:
            print(f"Capacidad excedida. Solo caben {self.capacidad - self.pasajeros_actuales}")

    def bajar_pasajeros(self, cantidad):
        self.pasajeros_actuales = max(0, self.pasajeros_actuales - cantidad)
        print(f"Bajaron {cantidad} pasajeros. Total: {self.pasajeros_actuales}")

    def __str__(self):
        return f"Bus({self.codigo}, {self.pasajeros_actuales}/{self.capacidad})"

    def __repr__(self):
        return f"Bus(codigo={self.codigo!r}, capacidad={self.capacidad!r})"


bus1 = Bus("BUS-001", 40)
bus2 = Bus("BUS-002", 50)

print(bus1.subir_pasajeros(20))
print(bus2.subir_pasajeros(30))
bus1.bajar_pasajeros(5)
print(str(bus1))
print(repr(bus1))
print(Bus.tipo_vehiculo)
