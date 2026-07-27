# mp_serializers.py
# Serializers DRF para el sistema de transporte público.
# Demuestra ModelSerializer, nested relationships, read_only fields y validación.
# Adaptado de shopapi store serializers.

from rest_framework import serializers
from django.contrib.auth.models import User
from .mp_models import Ruta, Bus, Viaje, Parada


class ParadaSerializer(serializers.ModelSerializer):
    """Serializer para las paradas de una ruta."""
    class Meta:
        model = Parada
        fields = [
            "id", "ruta", "nombre", "direccion",
            "orden", "latitud", "longitud",
        ]


class RutaSerializer(serializers.ModelSerializer):
    """Serializer de rutas con conteo de buses y paradas anidadas."""
    cantidad_buses = serializers.IntegerField(
        source="buses.count", read_only=True
    )
    paradas = ParadaSerializer(many=True, read_only=True)

    class Meta:
        model = Ruta
        fields = [
            "id", "nombre", "descripcion", "origen", "destino",
            "tarifa_base", "is_active", "created_at", "updated_at",
            "cantidad_buses", "paradas",
        ]
        read_only_fields = ["created_at", "updated_at"]


class BusSerializer(serializers.ModelSerializer):
    """
    Serializer de buses con nombre de ruta como campo calculado.
    Equivalente al serializer de Product con category_name.
    """
    ruta_nombre = serializers.CharField(
        source="ruta.nombre", read_only=True
    )
    estado_display = serializers.CharField(
        source="get_estado_display", read_only=True
    )

    class Meta:
        model = Bus
        fields = [
            "id", "ruta", "ruta_nombre", "placa", "capacidad",
            "modelo", "anio_fabricacion", "estado", "estado_display",
            "created_at",
        ]
        read_only_fields = ["created_at"]

    def validate_capacidad(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "La capacidad debe ser al menos 1."
            )
        return value


class BusListSerializer(serializers.ModelSerializer):
    """Serializer simplificado para listados de buses (sin campos anidados)."""
    ruta_nombre = serializers.CharField(
        source="ruta.nombre", read_only=True
    )

    class Meta:
        model = Bus
        fields = ["id", "placa", "modelo", "ruta_nombre", "estado", "capacidad"]


class ViajeSerializer(serializers.ModelSerializer):
    """
    Serializer completo de viajes.
    Incluye datos del bus, ruta y conductor.
    """
    bus_placa = serializers.CharField(source="bus.placa", read_only=True)
    ruta_nombre = serializers.CharField(source="ruta.nombre", read_only=True)
    conductor_nombre = serializers.CharField(
        source="conductor.username", read_only=True, default=None
    )
    asientos_disponibles = serializers.IntegerField(read_only=True)

    class Meta:
        model = Viaje
        fields = [
            "id", "bus", "bus_placa", "ruta", "ruta_nombre",
            "conductor", "conductor_nombre", "fecha_salida",
            "fecha_llegada", "pasajeros_actuales", "estado",
            "asientos_disponibles", "created_at", "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]

    def validate(self, data):
        """Validar que el bus pertenezca a la ruta seleccionada."""
        if data.get("bus") and data.get("ruta"):
            if data["bus"].ruta != data["ruta"]:
                raise serializers.ValidationError(
                    "El bus seleccionado no pertenece a la ruta indicada."
                )
        return data


class UserSerializer(serializers.ModelSerializer):
    """Serializer básico de usuario para incluir en viajes."""
    class Meta:
        model = User
        fields = ["id", "username", "email"]
        read_only_fields = ["id"]
