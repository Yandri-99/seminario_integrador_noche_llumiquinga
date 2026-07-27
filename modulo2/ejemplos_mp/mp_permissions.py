# mp_permissions.py
# Permisos personalizados DRF para el sistema de transporte público.
# Demuestra: BasePermission, has_permission, has_object_permission.
# Adaptado de shopapi store permissions.

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStaffOrReadOnly(BasePermission):
    """
    Permiso que permite lectura a cualquier usuario autenticado,
    pero restringe escritura (POST, PUT, PATCH, DELETE) a staff.
    Equivalente exacto de shopapi store permissions.
    """
    def has_permission(self, request, view):
        # Métodos seguros (GET, HEAD, OPTIONS) -> solo autenticados
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        # Métodos de escritura -> solo staff
        return bool(request.user and request.user.is_staff)


class IsOwnerOrStaff(BasePermission):
    """
    Permiso de objeto: el usuarioDueño O staff puede modificar.
    Útil para viajes: el conductor solo ve sus propios viajes
    (salvo que sea staff y vea todos).
    """
    def has_object_permission(self, request, view, obj):
        # Staff siempre tiene acceso
        if request.user.is_staff:
            return True
        # Verificar si el objeto tiene atributo 'conductor'
        if hasattr(obj, "conductor"):
            return obj.conductor == request.user
        # Verificar si el objeto tiene atributo 'user'
        if hasattr(obj, "user"):
            return obj.user == request.user
        return False


class IsConductorOrReadOnly(BasePermission):
    """
    Permiso específico: solo el conductor asignado puede
    modificar el estado de su viaje (ej: marcar en curso).
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(
            request.user
            and request.user.is_authenticated
            and hasattr(obj, "conductor")
            and obj.conductor == request.user
        )
