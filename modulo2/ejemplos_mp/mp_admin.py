# mp_admin.py
# Configuración del admin Django para el sistema de transporte público.
# Demuestra: @admin.register, list_display, list_filter, inlines, search_fields.
# Adaptado de shopapi store admin.

from django.contrib import admin
from .mp_models import Ruta, Bus, Viaje, Parada


@admin.register(Ruta)
class RutaAdmin(admin.ModelAdmin):
    list_display = [
        "id", "nombre", "origen", "destino",
        "tarifa_base", "is_active", "created_at",
    ]
    list_filter = ["is_active"]
    search_fields = ["nombre", "origen", "destino"]


@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display = [
        "id", "placa", "modelo", "anio_fabricacion",
        "capacidad", "estado", "ruta",
    ]
    list_filter = ["estado", "ruta", "anio_fabricacion"]
    search_fields = ["placa", "modelo"]
    list_editable = ["estado"]


class ParadaInline(admin.TabularInline):
    """Inline para mostrar paradas dentro de la edición de Ruta."""
    model = Parada
    extra = 0
    fields = ["nombre", "direccion", "orden", "latitud", "longitud"]


@admin.register(Ruta)
class RutaAdminConParadas(admin.ModelAdmin):
    """
    Versión alternativa de RutaAdmin con inline de paradas.
    Nota: Solo se puede registrar un Admin por modelo.
    En producción, elige UNA de las dos clases RutaAdmin.
    """
    list_display = [
        "id", "nombre", "origen", "destino",
        "tarifa_base", "is_active",
    ]
    list_filter = ["is_active"]
    search_fields = ["nombre", "origen", "destino"]
    inlines = [ParadaInline]


@admin.register(Viaje)
class ViajeAdmin(admin.ModelAdmin):
    list_display = [
        "id", "bus", "ruta", "conductor",
        "fecha_salida", "pasajeros_actuales",
        "estado", "created_at",
    ]
    list_filter = ["estado", "ruta"]
    search_fields = ["bus__placa", "conductor__username"]
    readonly_fields = ["total", "created_at", "updated_at"]

    @admin.display(description="Total asientos")
    def total(self, obj):
        return obj.bus.capacidad
