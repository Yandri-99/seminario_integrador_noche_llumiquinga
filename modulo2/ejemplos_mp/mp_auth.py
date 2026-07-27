# mp_auth.py
# Vistas de autenticación JWT para la API de transporte público.
# Demuestra: registro, login con JWT, logout con blacklist de tokens.
# Adaptado de vehiculos_api catalog auth_views y shopapi JWT config.

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User

User = get_user_model()


@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    """
    Registro de nuevo usuario conductor o pasajero.

    Body JSON:
        {
            "username": "conductor1",
            "email": "conductor@transporte.com",
            "password": "mi_password_seguro"
        }

    Respuesta 201:
        {
            "id": 1,
            "username": "conductor1",
            "email": "conductor@transporte.com"
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
            {"detail": "El nombre de usuario ya existe."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    return Response(
        {"id": user.id, "username": user.username, "email": user.email},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login: obtiene tokens JWT (access + refresh).

    Body JSON:
        {
            "username": "conductor1",
            "password": "mi_password_seguro"
        }

    Respuesta 200:
        {
            "access": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
            "user": {
                "id": 1,
                "username": "conductor1"
            }
        }
    """
    username = request.data.get("username", "")
    password = request.data.get("password", "")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"detail": "Credenciales inválidas."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {"id": user.id, "username": user.username},
    })


@api_view(["POST"])
def logout_view(request):
    """
    Logout: agrega el refresh token al blacklist.

    Headers:
        Authorization: Bearer <access_token>

    Body JSON:
        {
            "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOi..."
        }

    Respuesta 200:
        {"detail": "Sesión cerrada exitosamente."}
    """
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"detail": "Se requiere el refresh token."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(
            {"detail": "Sesión cerrada exitosamente."},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response(
            {"detail": "Token inválido o ya expirado."},
            status=status.HTTP_400_BAD_REQUEST,
        )
