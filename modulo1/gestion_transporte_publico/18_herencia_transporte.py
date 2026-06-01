class Vehiculo:
    def __init__(self, marca, modelo, año, placa):
        self.marca = marca
        self.modelo = modelo
        self.año = año
        self.placa = placa
        self._velocidad = 0

    def acelerar(self, incremento):
        self._velocidad += incremento
        return self

    def frenar(self, decremento):
        self._velocidad = max(0, self._velocidad - decremento)
        return self

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.año}) Placa: {self.placa} - {self._velocidad} km/h"


class Bus(Vehiculo):
    def __init__(self, marca, modelo, año, placa, capacidad=40):
        super().__init__(marca, modelo, año, placa)
        self.capacidad = capacidad

    def anunciar_parada(self, parada):
        return f"{self.marca} {self.modelo}: Proxima parada - {parada}"

    def __str__(self):
        return f"{super().__str__()} ({self.capacidad} pasajeros)"


class Taxi(Vehiculo):
    def __init__(self, marca, modelo, año, placa, licencia):
        super().__init__(marca, modelo, año, placa)
        self.licencia = licencia

    def iniciar_viaje(self, destino):
        return f"Taxi {self.placa} en viaje a {destino}"

    def __str__(self):
        return f"{super().__str__()} (Licencia: {self.licencia})"


class BusElectrico(Bus):
    def __init__(self, marca, modelo, año, placa, autonomia):
        super().__init__(marca, modelo, año, placa)
        self.__autonomia = autonomia
        self.__bateria = 100

    def cargar(self, porcentaje=100):
        self.__bateria = min(100, self.__bateria + porcentaje)
        return self

    @property
    def autonomia_restante(self):
        return self.__autonomia * self.__bateria / 100

    def __str__(self):
        return (f"{super().__str__()} | "
                f"Bateria: {self.__bateria}% | "
                f"Autonomia: {self.autonomia_restante:.0f}km")


tesla = BusElectrico("Tesla", "Semi", 2025, "EL-001", 500)
tesla.acelerar(80)
print(tesla)

print(isinstance(tesla, BusElectrico))
print(isinstance(tesla, Bus))
print(isinstance(tesla, Vehiculo))
print(isinstance(tesla, Taxi))

print(BusElectrico.__mro__)
