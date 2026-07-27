# mp_views.py
# ViewSets DRF para el sistema de transporte público.
# Demuestra ModelViewSet, get_queryset dinámico, mixins y actiones personalizadas.
# Adaptado de shopapi store views.

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .mp_models import Ruta, Bus, Viaje, Parada
from .mp_serializers import (
    RutaSerializer, BusSerializer, BusListSerializer,
    ViajeSerializer, ParadaSerializer,
)
from .mp_permissions import IsStaffOrReadOnly, IsOwnerOrStaff
from .mp_filters import RutaFilter, BusFilter, ViajeFilter
from .mp_pagination import StandardPagination


class RutaViewSet(viewsets.ModelViewSet):
    """
    CRUD completo de rutas de transporte.
    Solo staff puede crear/editar/eliminar; autenticados pueden leer.
    """
    queryset = Ruta.objects.prefetch_related("buses", "paradas").all()
    serializer_class = RutaSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = RutaFilter
    search_fields = ["nombre", "origen", "destino"]
    ordering_fields = ["nombre", "tarifa_base", "created_at"]
    pagination_class = StandardPagination


class BusViewSet(viewsets.ModelViewSet):
    """
    CRUD de buses. Listado público (AllowAny), detalle requiere auth.
    Filtrado por ruta, estado y año.
    """
    queryset = Bus.objects.select_related("ruta").all()
    serializer_class = BusSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = BusFilter
    search_fields = ["placa", "modelo"]
    ordering_fields = ["placa", "anio_fabricacion", "created_at"]
    pagination_class = StandardPagination

    def get_serializer_class(self):
        """Usar serializer simplificado para listados."""
        if self.action == "list":
            return BusListSerializer
        return BusSerializer

    def get_permissions(self):
        """El listado es público; el resto requiere autenticación."""
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()

    @action(detail=True, methods=["get"], url_path="historial-viajes")
    def historial_viajes(self, request, pk=None):
        """Acción personalizada: historial de viajes de un bus específico."""
        bus = self.get_object()
        viajes = bus.viajes.order_by("-fecha_salida")[:10]
        serializer = ViajeSerializer(viajes, many=True)
        return Response(serializer.data)


class ViajeViewSet(viewsets.ModelViewSet):
    """
    CRUD de viajes. Filtrado por estado, ruta y rango de fechas.
    Incluye acción personalizada para cancelar un viaje.
    """
    queryset = Viaje.objects.select_related(
        "bus", "ruta", "conductor"
    ).all()
    serializer_class = ViajeSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ViajeFilter
    ordering_fields = ["fecha_salida", "pasajeros_actuales", "created_at"]
    pagination_class = StandardPagination

    @action(detail=True, methods=["post"], url_path="cancelar")
    def cancelar_viaje(self, request, pk=None):
        """
        Acción: cancelar un viaje programado.
        Solo se puede cancelar si está en estado 'programado'.
        """
        viaje = self.get_object()
        if viaje.estado != Viaje.EstadoViaje.PROGRAMADO:
            return Response(
                {"detail": "Solo se pueden cancelar viajes programados."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        viaje.estado = Viaje.EstadoViaje.CANCELADO
        viaje.save()
        return Response(
            {"detail": f"Viaje {viaje.id} cancelado exitosamente."},
            status=status.HTTP_200_OK,
        )


class ParadaViewSet(viewsets.ModelViewSet):
    """CRUD de paradas. Filtradas por ruta."""
    queryset = Parada.objects.select_related("ruta").all()
    serializer_class = ParadaSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["ruta"]
    ordering_fields = ["orden"]
