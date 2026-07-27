# mp_models.py
# Modelos Django para el sistema de gestión de transporte público.
# Adaptados de shopapi (Category -> Ruta, Product -> Bus, Order -> Viaje).
# Cada modelo demuestra relaciones ForeignKey, choices y campos estándar.

from django.db import models
from django.contrib.auth.models import User


class Ruta(models.Model):
    """
    Representa una ruta de transporte público (ej: Ruta 10, Ruta 50).
    Equivalente a Category en shopapi.
    """
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, default="")
    origen = models.CharField(max_length=120)
    destino = models.CharField(max_length=120)
    tarifa_base = models.DecimalField(max_digits=6, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return f"{self.nombre} ({self.origen} -> {self.destino})"


class Bus(models.Model):
    """
    Un bus asignado a una ruta. Puede tener múltiples viajes.
    Equivalente a Product en shopapi.
    """
    class EstadoBus(models.TextChoices):
        DISPONIBLE = "disponible", "Disponible"
        EN_SERVICIO = "en_servicio", "En Servicio"
        EN_MANTENIMIENTO = "mantenimiento", "En Mantenimiento"
        RETIRADO = "retirado", "Retirado"

    ruta = models.ForeignKey(
        Ruta, on_delete=models.PROTECT, related_name="buses"
    )
    placa = models.CharField(max_length=20, unique=True)
    capacidad = models.PositiveIntegerField(default=40)
    modelo = models.CharField(max_length=80)
    anio_fabricacion = models.PositiveIntegerField()
    estado = models.CharField(
        max_length=20,
        choices=EstadoBus.choices,
        default=EstadoBus.DISPONIBLE,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["placa"]

    def __str__(self):
        return f"Bus {self.placa} - {self.modelo} ({self.get_estado_display()})"


class Viaje(models.Model):
    """
    Un viaje programado: un bus en una ruta en una fecha/hora específica.
    Equivalente a Order en shopapi.
    """
    class EstadoViaje(models.TextChoices):
        PROGRAMADO = "programado", "Programado"
        EN_CURSO = "en_curso", "En Curso"
        COMPLETADO = "completado", "Completado"
        CANCELADO = "cancelado", "Cancelado"

    bus = models.ForeignKey(
        Bus, on_delete=models.CASCADE, related_name="viajes"
    )
    ruta = models.ForeignKey(
        Ruta, on_delete=models.CASCADE, related_name="viajes"
    )
    conductor = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="viajes_conducidos"
    )
    fecha_salida = models.DateTimeField()
    fecha_llegada = models.DateTimeField(null=True, blank=True)
    pasajeros_actuales = models.PositiveIntegerField(default=0)
    estado = models.CharField(
        max_length=20,
        choices=EstadoViaje.choices,
        default=EstadoViaje.PROGRAMADO,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-fecha_salida"]

    def __str__(self):
        return f"Viaje {self.bus.placa} - {self.ruta.nombre} ({self.get_estado_display()})"

    @property
    def asientos_disponibles(self):
        return self.bus.capacidad - self.pasajeros_actuales


class Parada(models.Model):
    """
    Parada intermedia dentro de una ruta.
    Equivalente a OrderItem en shopapi (detalle de la ruta).
    """
    ruta = models.ForeignKey(
        Ruta, on_delete=models.CASCADE, related_name="paradas"
    )
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    orden = models.PositiveIntegerField()
    latitud = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitud = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    class Meta:
        ordering = ["ruta", "orden"]
        unique_together = ["ruta", "orden"]

    def __str__(self):
        return f"Parada {self.orden}: {self.nombre} ({self.ruta.nombre})"
