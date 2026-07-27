# mp_filters.py
# Filtros django-filter para el sistema de transporte público.
# Demuestra FilterSet con CharFilter, NumberFilter, DateFilter y lookups.
# Adaptado de shopapi store filters.

import django_filters
from .mp_models import Ruta, Bus, Viaje


class RutaFilter(django_filters.FilterSet):
    """
    Filtros para rutas de transporte.
    - nombre: búsqueda parcial (icontains)
    - tarifa_min/tarifa_max: rango de tarifas
    """
    nombre = django_filters.CharFilter(lookup_expr="icontains")
    tarifa_min = django_filters.NumberFilter(
        field_name="tarifa_base", lookup_expr="gte"
    )
    tarifa_max = django_filters.NumberFilter(
        field_name="tarifa_base", lookup_expr="lte"
    )

    class Meta:
        model = Ruta
        fields = ["is_active", "origen", "destino"]


class BusFilter(django_filters.FilterSet):
    """
    Filtros para buses.
    - placa: búsqueda exacta o parcial
    - modelo: búsqueda parcial
    - anio_min/anio_max: rango de años de fabricación
    - capacidad_min/capacidad_max: rango de capacidad
    - ruta_nombre: filtrar por nombre de ruta (relación)
    """
    placa = django_filters.CharFilter(lookup_expr="icontains")
    modelo = django_filters.CharFilter(lookup_expr="icontains")
    anio_min = django_filters.NumberFilter(
        field_name="anio_fabricacion", lookup_expr="gte"
    )
    anio_max = django_filters.NumberFilter(
        field_name="anio_fabricacion", lookup_expr="lte"
    )
    capacidad_min = django_filters.NumberFilter(
        field_name="capacidad", lookup_expr="gte"
    )
    capacidad_max = django_filters.NumberFilter(
        field_name="capacidad", lookup_expr="lte"
    )
    ruta_nombre = django_filters.CharFilter(
        field_name="ruta__nombre", lookup_expr="icontains"
    )

    class Meta:
        model = Bus
        fields = ["estado", "ruta"]


class ViajeFilter(django_filters.FilterSet):
    """
    Filtros para viajes.
    - fecha_desde/fecha_hasta: rango de fechas de salida
    - ruta_nombre: filtrar por ruta
    - conductor_username: filtrar por conductor
    """
    fecha_desde = django_filters.DateTimeFilter(
        field_name="fecha_salida", lookup_expr="gte"
    )
    fecha_hasta = django_filters.DateTimeFilter(
        field_name="fecha_salida", lookup_expr="lte"
    )
    ruta_nombre = django_filters.CharFilter(
        field_name="ruta__nombre", lookup_expr="icontains"
    )
    conductor_username = django_filters.CharFilter(
        field_name="conductor__username", lookup_expr="icontains"
    )

    class Meta:
        model = Viaje
        fields = ["estado", "bus", "ruta", "conductor"]
