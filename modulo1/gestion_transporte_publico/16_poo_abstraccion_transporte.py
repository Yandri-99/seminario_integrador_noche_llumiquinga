from abc import ABC, abstractmethod


class VehiculoTransporte(ABC):
    def __init__(self, codigo, color="blanco"):
        self.codigo = codigo
        self.color = color

    @abstractmethod
    def calcular_consumo(self) -> float:
        pass

    @abstractmethod
    def capacidad_maxima(self) -> int:
        pass

    def describir(self) -> str:
        return (f"{self.__class__.__name__} {self.codigo} {self.color}: "
                f"consumo={self.calcular_consumo():.2f} L/km, "
                f"capacidad={self.capacidad_maxima()} pasajeros")


class BusUrbano(VehiculoTransporte):
    def __init__(self, codigo, color="blanco"):
        super().__init__(codigo, color)

    def calcular_consumo(self):
        return 0.35

    def capacidad_maxima(self):
        return 40


class BusInterprovincial(VehiculoTransporte):
    def __init__(self, codigo, color="azul"):
        super().__init__(codigo, color)

    def calcular_consumo(self):
        return 0.45

    def capacidad_maxima(self):
        return 50


class Microbus(VehiculoTransporte):
    def __init__(self, codigo, color="verde"):
        super().__init__(codigo, color)

    def calcular_consumo(self):
        return 0.20

    def capacidad_maxima(self):
        return 15


vehiculos = [
    BusUrbano("BUS-001", "rojo"),
    BusInterprovincial("BUS-101", "azul"),
    Microbus("MB-001", "verde"),
]

for vehiculo in vehiculos:
    print(vehiculo.describir())

capacidad_total = sum(v.capacidad_maxima() for v in vehiculos)
print(f"Capacidad total de la flota: {capacidad_total} pasajeros")
