# mp_jwt_auth.py
# Flujo de autenticación JWT para la API de transporte público.
# Guía educativa que explica cómo funciona JWT con DRF.
# Basado en la configuración de shopapi (Simple JWT).


# ============================================================
# FLUJO COMPLETO DE JWT (JSON Web Tokens)
# ============================================================
#
# 1. USUARIO SE REGISTRA
#    POST /auth/register/
#    Body: {"username": "conductor1", "password": "seguro123"}
#    Respuesta: {"id": 1, "username": "conductor1"}
#
# 2. USUARIO INICIA SESIÓN -> OBTIENE TOKENS
#    POST /auth/login/
#    Body: {"username": "conductor1", "password": "seguro123"}
#    Respuesta:
#    {
#        "access": "eyJ0eXAi... (corta vida, 60 min)",
#        "refresh": "eyJ0eXAi... (larga vida, 1 día)"
#    }
#
# 3. USUARIO USA EL ACCESS TOKEN
#    GET /api/rutas/
#    Header: Authorization: Bearer eyJ0eXAi...
#    -> El servidor valida el token y responde con datos
#
# 4. ACCESS TOKEN EXPIRA -> USA REFRESH
#    POST /auth/token/refresh/
#    Body: {"refresh": "eyJ0eXAi..."}
#    Respuesta: {"access": "nuevo_token..."}
#
# 5. USUARIO CIERRA SESIÓN (blacklist)
#    POST /auth/logout/
#    Header: Authorization: Bearer eyJ0eXAi...
#    Body: {"refresh": "eyJ0eXAi..."}
#    -> El refresh token se agrega al blacklist


# ============================================================
# ESTRUCTURA DE UN JWT
# ============================================================
#
# Un token JWT tiene 3 partes separadas por puntos:
#   HEADER.PAYLOAD.SIGNATURE
#
# HEADER (algoritmo y tipo):
#   {"alg": "HS256", "typ": "JWT"}
#
# PAYLOAD (datos del usuario):
#   {
#     "user_id": 1,
#     "username": "conductor1",
#     "exp": 1700000000,     # Expiración
#     "iat": 1699996400,     # Emisión
#     "token_type": "access"
#   }
#
# SIGNATURE (firma HMAC-SHA256):
#   HMAC-SHA256(base64(header) + "." + base64(payload), secret_key)


# ============================================================
# CONFIGURACIÓN EN settings.py
# ============================================================
#
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ],
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.IsAuthenticated',
#     ],
# }
#
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'ROTATE_REFRESH_TOKENS': True,    # Nuevo refresh en cada refresh
#     'BLACKLIST_AFTER_ROTATION': True, # Antiguo refresh queda inválido
#     'ALGORITHM': 'HS256',
#     'AUTH_HEADER_TYPES': ('Bearer',),
# }


# ============================================================
# IMPLEMENTACIÓN PASO A PASO
# ============================================================

# --- models.py ---
from django.contrib.auth.models import User

# Django ya tiene el modelo User con:
#   username, email, password, is_staff, is_active, date_joined


# --- auth_views.py ---
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


# 1. Registro
@api_view(["POST"])
@permission_classes([AllowAny])
def register_view(request):
    """Registra un nuevo usuario y retorna sus datos."""
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email", "")

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email,
    )
    return Response({"id": user.id, "username": user.username}, status=201)


# 2. Login
@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """Autentica y retorna tokens JWT."""
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"detail": "Credenciales inválidas"}, status=401)

    # Generar tokens
    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),  # Token corto
        "refresh": str(refresh),              # Token largo
        "user": {"id": user.id, "username": user.username},
    })


# 3. Logout (blacklist)
@api_view(["POST"])
def logout_view(request):
    """Agrega el refresh token al blacklist."""
    refresh_token = request.data.get("refresh")
    token = RefreshToken(refresh_token)
    token.blacklist()  # Ya no se puede usar
    return Response({"detail": "Sesión cerrada"})


# ============================================================
# ENDPOINTS GENERADOS POR simplejwt
# ============================================================
#
# POST /api/auth/token/        -> TokenObtainPairView (login)
# POST /api/auth/token/refresh/ -> TokenRefreshView (refresh)
# POST /api/auth/token/blacklist/ -> TokenBlacklistView (logout)
#
# NOTA: En nuestro proyecto usamos vistas personalizadas
# en vez de las built-in para tener más control sobre la
# lógica de registro y respuesta.


# ============================================================
# SEGURIDAD
# ============================================================
#
# 1. NUNCA enviar el token por URL (?token=xxx)
# 2. SIEMPRE usar HTTPS en producción
# 3. El ACCESS token tiene corta vida (60 min)
# 4. El REFRESH token permite obtener nuevos access tokens
# 5. El blacklist previene reuso de tokens comprometidos
# 6. La SECRET_KEY debe ser larga y aleatoria en producción
# 7. NUNCA hardcodear la SECRET_KEY en el código fuente
