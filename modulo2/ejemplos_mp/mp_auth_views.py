# mp_auth_views.py
# Vistas de autenticación para el catálogo de vehículos.
# Adaptado de vehiculos_api catalog/auth_views.py.
# Demuestra: @api_view, AllowAny, serializer validation, create_user.

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    """
    Registro de usuario para el catálogo de vehículos.

    Body JSON:
        {
            "username": "admin_vehiculos",
            "email": "admin@transporte.com",
            "password": "seguro123"
        }

    Ejemplo con cURL:
        curl -X POST http://localhost:8000/api/auth/register/ \
          -H "Content-Type: application/json" \
          -d '{"username":"admin","email":"a@b.com","password":"seguro123"}'

    Respuesta 201:
        {
            "id": 1,
            "username": "admin_vehiculos",
            "email": "admin@transporte.com"
        }
    """
    username = request.data.get("username", "").strip()
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "")

    if not username or not password:
        return Response(
            {"detail": "username y password son requeridos."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"detail": "El usuario ya existe."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        },
        status=status.HTTP_201_CREATED,
    )
