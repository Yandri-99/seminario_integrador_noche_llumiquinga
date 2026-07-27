# mp_urls.py
# URL routing para la API de transporte público.
# Usa DRF DefaultRouter para generar automáticamente las rutas REST.
# Adaptado de shopapi store urls.

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .mp_views import RutaViewSet, BusViewSet, ViajeViewSet, ParadaViewSet
from .mp_auth import register_view, login_view, logout_view

# Router DRF: genera URLs automáticas para cada ViewSet
# GET    /rutas/        -> list
# POST   /rutas/        -> create
# GET    /rutas/{id}/   -> retrieve
# PUT    /rutas/{id}/   -> update
# DELETE /rutas/{id}/   -> destroy
router = DefaultRouter()
router.register(r"rutas", RutaViewSet, basename="rutas")
router.register(r"buses", BusViewSet, basename="buses")
router.register(r"viajes", ViajeViewSet, basename="viajes")
router.register(r"paradas", ParadaViewSet, basename="paradas")

urlpatterns = [
    # --- Autenticación JWT ---
    # POST /auth/register/       -> Registro de usuario
    # POST /auth/login/          -> Obtener tokens (access + refresh)
    # POST /auth/token/refresh/  -> Refrescar access token
    # POST /auth/logout/         -> Blacklist del refresh token
    path("auth/register/", register_view, name="register"),
    path("auth/login/", login_view, name="login"),
    path(
        "auth/token/refresh/",
        TokenObtainPairView.as_view(),
        name="token_refresh",
    ),
    path("auth/logout/", logout_view, name="logout"),
]

# Agregar todas las URLs del router al final
urlpatterns += router.urls

# URLs generadas automáticamente:
# /api/rutas/          GET, POST
# /api/rutas/{id}/     GET, PUT, PATCH, DELETE
# /api/buses/          GET, POST
# /api/buses/{id}/     GET, PUT, PATCH, DELETE
# /api/buses/{id}/historial-viajes/  GET  (acción personalizada)
# /api/viajes/         GET, POST
# /api/viajes/{id}/    GET, PUT, PATCH, DELETE
# /api/viajes/{id}/cancelar/         POST (acción personalizada)
# /api/paradas/        GET, POST
# /api/paradas/{id}/   GET, PUT, PATCH, DELETE
