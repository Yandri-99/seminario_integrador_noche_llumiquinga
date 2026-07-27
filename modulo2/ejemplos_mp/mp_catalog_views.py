# mp_catalog_views.py
# Views del catálogo de vehículos/buses.
# Adaptado de vehiculos_api catalog/views.py al dominio de transporte.
# Demuestra: ModelViewSet, get_queryset dinámico, permisos por acción.

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .mp_catalog_models import Flota, BusCatalogo
from .mp_serializers import RutaSerializer, BusSerializer
from .mp_permissions import IsStaffOrReadOnly


class FlotaViewSet(viewsets.ModelViewSet):
    """
    CRUD de flotas de transporte.
    Equivalente a MarcaViewSet en vehiculos_api.

    Solo staff puede crear/editar/eliminar (IsAdminOrReadOnly).
    Lectura pública.
    """
    queryset = Flota.objects.all().order_by("id")
    # En producción usarías un FlotaSerializer propio
    # serializer_class = FlotaSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["nombre"]
    ordering_fields = ["id", "nombre", "creado_en"]


class BusCatalogoViewSet(viewsets.ModelViewSet):
    """
    CRUD de buses en el catálogo.
    Equivalente a VehiculoViewSet en vehiculos_api.

    Filtrado dinámico por año, flota y estado.
    Listado público; otras acciones requieren auth.
    """
    queryset = BusCatalogo.objects.select_related("flota").all().order_by("-id")
    # En producción usarías un BusCatalogoSerializer propio
    # serializer_class = BusCatalogoSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["flota"]
    search_fields = ["modelo", "placa", "color", "flota__nombre"]
    ordering_fields = ["id", "anio", "modelo", "placa", "creado_en"]

    def get_queryset(self):
        """
        Filtrado dinámico por parámetros de query string.
        Equivalente a get_queryset en vehiculos_api.
        """
        qs = super().get_queryset()
        anio_min = self.request.query_params.get("anio_min")
        anio_max = self.request.query_params.get("anio_max")
        if anio_min:
            qs = qs.filter(anio__gte=int(anio_min))
        if anio_max:
            qs = qs.filter(anio__lte=int(anio_max))
        return qs

    def get_permissions(self):
        """Público: SOLO listar buses. Resto requiere auth."""
        if self.action == "list":
            return [AllowAny()]
        return super().get_permissions()
