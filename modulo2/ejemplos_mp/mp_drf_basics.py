# mp_drf_basics.py
# Conceptos básicos de Django REST Framework aplicados al transporte público.
# Guía educativa con ejemplos del dominio de gestión de transporte.
# No es un módulo ejecutable: es una referencia de conceptos DRF.


# ============================================================
# 1. SERIALIZERS - Conversión de datos
# ============================================================
# Los serializers convierten modelos Django <-> JSON.
#
# --- ModelSerializer (el más común) ---
# from rest_framework import serializers
# from .models import Bus
#
# class BusSerializer(serializers.ModelSerializer):
#     ruta_nombre = serializers.CharField(source='ruta.nombre', read_only=True)
#
#     class Meta:
#         model = Bus
#         fields = ['id', 'placa', 'modelo', 'capacidad', 'ruta', 'ruta_nombre']
#         read_only_fields = ['created_at']
#
# --- Validación personalizada ---
#     def validate_capacidad(self, value):
#         if value < 1:
#             raise serializers.ValidationError("La capacidad debe ser >= 1")
#         return value
#
# --- Validación a nivel de serializer ---
#     def validate(self, data):
#         if data['bus'].ruta != data['ruta']:
#             raise serializers.ValidationError("El bus no pertenece a la ruta")
#         return data
#
# --- Serializer anidado (lectura) ---
# class RutaSerializer(serializers.ModelSerializer):
#     paradas = ParadaSerializer(many=True, read_only=True)  # nested
#     buses_count = serializers.IntegerField(source='buses.count', read_only=True)
#
# TIPOS DE SERIALIZER:
#   Serializer            -> Serializer genérico con campos explícitos
#   ModelSerializer       -> Auto-genera campos desde el modelo
#   HyperlinkedModelSerializer -> Usa URLs en vez de IDs


# ============================================================
# 2. VIEWSETS - CRUD automático
# ============================================================
# ViewSets generan operaciones CRUD completas con el Router.
#
# from rest_framework import viewsets
# from .models import Ruta
# from .serializers import RutaSerializer
#
# class RutaViewSet(viewsets.ModelViewSet):
#     queryset = Ruta.objects.all()
#     serializer_class = RutaSerializer
#
# Esto genera automáticamente:
#   GET    /rutas/         -> list
#   POST   /rutas/         -> create
#   GET    /rutas/{id}/    -> retrieve
#   PUT    /rutas/{id}/    -> update
#   PATCH  /rutas/{id}/    -> partial_update
#   DELETE /rutas/{id}/    -> destroy
#
# --- ViewSet personalizado ---
#     def get_queryset(self):
#         """Filtrar por usuario o parámetros de query."""
#         qs = super().get_queryset()
#         estado = self.request.query_params.get('estado')
#         if estado:
#             qs = qs.filter(estado=estado)
#         return qs
#
# --- Acción personalizada ---
#     @action(detail=True, methods=['post'])
#     def cancelar(self, request, pk=None):
#         viaje = self.get_object()
#         viaje.estado = 'cancelado'
#         viaje.save()
#         return Response({'detail': 'Viaje cancelado'})
#
# ViewSet types:
#   ModelViewSet    -> CRUD completo
#   ReadOnlyModelViewSet -> Solo lectura (list + retrieve)
#   GenericViewSet  -> Base para combos personalizados
#   ViewSet         -> Más bajo nivel, define manualmente las actions


# ============================================================
# 3. ROUTERS - Generación automática de URLs
# ============================================================
# from rest_framework.routers import DefaultRouter
# from .views import RutaViewSet, BusViewSet
#
# router = DefaultRouter()
# router.register(r'rutas', RutaViewSet, basename='rutas')
# router.register(r'buses', BusViewSet, basename='buses')
#
# urlpatterns = router.urls
#
# Esto genera:
#   /rutas/             GET, POST
#   /rutas/{pk}/        GET, PUT, PATCH, DELETE
#   /buses/             GET, POST
#   /buses/{pk}/        GET, PUT, PATCH, DELETE
#   /buses/{pk}/historial/  GET (acción personalizada)
#
# Router types:
#   DefaultRouter  -> Incluye API root (página de inicio)
#   SimpleRouter   -> Sin API root


# ============================================================
# 4. PERMISOS - Control de acceso
# ============================================================
# from rest_framework.permissions import BasePermission
#
# --- Permiso a nivel de vista ---
# class IsStaffOrReadOnly(BasePermission):
#     def has_permission(self, request, view):
#         if request.method in SAFE_METHODS:
#             return request.user and request.user.is_authenticated
#         return request.user and request.user.is_staff
#
# --- Permiso a nivel de objeto ---
# class IsOwnerOrStaff(BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return obj.conductor == request.user or request.user.is_staff
#
# Permisos built-in de DRF:
#   AllowAny         -> Cualquiera puede acceder
#   IsAuthenticated  -> Requiere autenticación
#   IsAdminUser       -> Requiere is_staff=True
#   IsAuthenticatedOrReadOnly -> Auth para escritura, público para lectura


# ============================================================
# 5. FILTROS - Búsqueda y filtrado
# ============================================================
# --- django-filter (FilterSet) ---
# import django_filters
# from .models import Bus
#
# class BusFilter(django_filters.FilterSet):
#     placa = django_filters.CharFilter(lookup_expr='icontains')
#     anio_min = django_filters.NumberFilter(field_name='anio', lookup_expr='gte')
#
#     class Meta:
#         model = Bus
#         fields = ['estado', 'ruta']
#
# --- Uso en ViewSet ---
#     filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
#     filterset_class = BusFilter
#     search_fields = ['placa', 'modelo']
#     ordering_fields = ['placa', 'created_at']
#
# Uso: GET /buses/?placa=ABC&estado=disponible&search=volvo&ordering=-anio


# ============================================================
# 6. PAGINACIÓN - División de resultados
# ============================================================
# from rest_framework.pagination import PageNumberPagination
#
# class StandardPagination(PageNumberPagination):
#     page_size = 10
#     page_size_query_param = 'page_size'
#     max_page_size = 100
#
# Respuesta:
#   {
#     "count": 150,
#     "next": "http://api/buses/?page=2",
#     "previous": null,
#     "results": [...]
#   }
#
# Tipos:
#   PageNumberPagination  -> Por número de página (?page=2)
#   LimitOffsetPagination -> Por offset (?limit=10&offset=20)
#   CursorPagination      -> Cursor-based (eficiente, sin saltos)


# ============================================================
# 7. RESPONSE - Formato estándar de respuestas
# ============================================================
# from rest_framework.response import Response
# from rest_framework import status
#
# # Éxito
# return Response(serializer.data, status=status.HTTP_200_OK)
# return Response(serializer.data, status=status.HTTP_201_CREATED)
#
# # Error
# return Response(
#     {'detail': 'No autorizado'},
#     status=status.HTTP_401_UNAUTHORIZED
# )
#
# HTTP STATUS CODES:
#   200 OK            -> Éxito general
#   201 Created       -> Recurso creado
#   204 No Content    -> Éxito sin contenido (DELETE)
#   400 Bad Request   -> Datos inválidos
#   401 Unauthorized  -> No autenticado
#   403 Forbidden     -> Autenticado sin permisos
#   404 Not Found     -> Recurso no encontrado
