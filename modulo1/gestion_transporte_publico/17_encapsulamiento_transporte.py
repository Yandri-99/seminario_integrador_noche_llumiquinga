class GestionBus:
    def __init__(self, codigo, capacidad=40):
        self.codigo = codigo
        self.__pasajeros = 0
        self.__historial_viajes = []
        self.__activo = True
        self.__capacidad = capacidad
        self.__registrar("Bus registrado en el sistema")

    @property
    def pasajeros(self):
        return self.__pasajeros

    @property
    def activo(self):
        return self.__activo

    @property
    def historial(self):
        return list(self.__historial_viajes)

    def subir_pasajeros(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        if self.__pasajeros + cantidad > self.__capacidad:
            raise ValueError(f"Capacidad excedida (max: {self.__capacidad})")
        self.__pasajeros += cantidad
        self.__registrar(f"Subieron: +{cantidad} pasajeros")
        return self

    def bajar_pasajeros(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        if cantidad > self.__pasajeros:
            raise ValueError(f"No hay suficientes pasajeros (actual: {self.__pasajeros})")
        self.__pasajeros -= cantidad
        self.__registrar(f"Bajaron: -{cantidad} pasajeros")
        return self

    def trasladar_a(self, destino, cantidad):
        self.bajar_pasajeros(cantidad)
        destino.subir_pasajeros(cantidad)
        self.__registrar(f"Traslado a {destino.codigo}: -{cantidad} pasajeros")
        return self

    def __registrar(self, operacion):
        from datetime import datetime
        hora = datetime.now().strftime("%H:%M:%S")
        self.__historial_viajes.append(f"[{hora}] {operacion}")

    def __str__(self):
        return f"Bus({self.codigo}: {self.__pasajeros}/{self.__capacidad} pasajeros)"


bus1 = GestionBus("BUS-001", 40)
bus2 = GestionBus("BUS-002", 30)

bus1.subir_pasajeros(15).bajar_pasajeros(5)
bus1.trasladar_a(bus2, 5)

print(bus1)
print(bus2)
print(f"Pasajeros bus1: {bus1.pasajeros}")

for entrada in bus1.historial:
    print(f"  {entrada}")
