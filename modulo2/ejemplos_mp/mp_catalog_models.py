# mp_catalog_models.py
# Modelos de catálogo de vehículos/buses.
# Adaptado de vehiculos_api catalog/models.py al dominio de transporte público.
# Demuestra: ForeignKey con PROTECT, choices, unique, auto_now_add.

from django.db import models


class Flota(models.Model):
    """
    Flota de transporte: agrupación de buses de una empresa.
    Equivalente a Marca en vehiculos_api.
    """
    nombre = models.CharField(max_length=120, unique=True)
    descripcion = models.TextField(blank=True, default="")
    activa = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Flotas"
        ordering = ["nombre"]


class BusCatalogo(models.Model):
    """
    Registro de un bus en el catálogo de vehículos.
    Equivalente a Vehiculo en vehiculos_api.

    Relación:
        Flota (1) -> (N) BusCatalogo  (ForeignKey con PROTECT)
    """
    flota = models.ForeignKey(
        Flota,
        on_delete=models.PROTECT,
        related_name="buses",
    )
    modelo = models.CharField(max_length=120)
    anio = models.IntegerField()
    placa = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=60, blank=True, default="")
    capacidad = models.PositiveIntegerField(default=40)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.flota.nombre} {self.modelo} ({self.placa})"

    class Meta:
        ordering = ["-creado_en"]
