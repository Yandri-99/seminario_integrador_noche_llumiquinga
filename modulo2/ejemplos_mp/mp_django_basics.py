# mp_django_basics.py
# Conceptos básicos de Django aplicados a gestión de transporte público.
# Este archivo es educativo: explica los fundamentos con ejemplos del dominio.
# No es un módulo ejecutable directamente, sino una guía de referencia.


# ============================================================
# 1. DJANGO SETTINGS - Configuración del proyecto
# ============================================================
# El archivo settings.py define toda la configuración:
#
# INSTALLED_APPS = [
#     'django.contrib.admin',       # Panel de administración
#     'django.contrib.auth',        # Sistema de autenticación
#     'django.contrib.contenttypes',# Framework de tipos de contenido
#     'django.contrib.sessions',    # Framework de sesiones
#     'django.contrib.messages',    # Sistema de mensajes
#     'django.contrib.staticfiles', # Archivos estáticos (CSS, JS)
#     'rest_framework',             # Django REST Framework
#     'transporte',                 # Nuestra app de transporte
# ]
#
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'transporte_db',
#     }
# }


# ============================================================
# 2. MODELOS - Representación de entidades de transporte
# ============================================================
# Los modelos definen la estructura de la base de datos.
#
# Ejemplo: Modelo Ruta
# class Ruta(models.Model):
#     nombre = models.CharField(max_length=100, unique=True)
#     origen = models.CharField(max_length=120)
#     destino = models.CharField(max_length=120)
#     tarifa_base = models.DecimalField(max_digits=6, decimal_places=2)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#
# TIPOS DE CAMPO PRINCIPALES:
#   CharField     -> Texto corto (nombres, placas)
#   TextField     -> Texto largo (descripciones)
#   IntegerField  -> Números enteros (capacidad, año)
#   DecimalField  -> Números decimales (tarifas, precios)
#   BooleanField  -> Verdadero/Falso (is_active)
#   DateTimeField -> Fecha y hora (created_at)
#   ForeignKey    -> Relación con otro modelo (Bus -> Ruta)


# ============================================================
# 3. RELACIONES - Conexiones entre modelos
# ============================================================
#
# OneToOneField: Un bus tiene UNA ficha técnica
#   class FichaTecnica(models.Model):
#       bus = models.OneToOneField(Bus, on_delete=models.CASCADE)
#
# ForeignKey: Un bus PERTENECE A UNA ruta (muchos buses -> una ruta)
#   class Bus(models.Model):
#       ruta = models.ForeignKey(Ruta, on_delete=models.PROTECT)
#
# ManyToMany: Un viaje puede tener MÚLTIPLES paradas
#   class Viaje(models.Model):
#       paradas = models.ManyToManyField(Parada)
#
# on_delete OPTIONS:
#   CASCADE     -> Si se elimina la ruta, se eliminan sus buses
#   PROTECT     -> No permite eliminar la ruta si tiene buses
#   SET_NULL    -> Si se elimina el usuario, el campo se pone NULL
#   DO_NOTHING  -> No hace nada (puede romper integridad)


# ============================================================
# 4. VISTAS - Manejo de peticiones HTTP
# ============================================================
#
# --- Vista basada en función (FBV) ---
# def listar_rutas(request):
#     rutas = Ruta.objects.all()
#     return render(request, 'rutas/listar.html', {'rutas': rutas})
#
# --- Vista basada en clase (CBV) ---
# class RutaListView(ListView):
#     model = Ruta
#     template_name = 'rutas/listar.html'
#     context_object_name = 'rutas'
#
# --- API View (DRF) ---
# @api_view(['GET', 'POST'])
# def rutas_list(request):
#     if request.method == 'GET':
#         rutas = Ruta.objects.all()
#         serializer = RutaSerializer(rutas, many=True)
#         return Response(serializer.data)


# ============================================================
# 5. ADMIN - Panel de administración
# ============================================================
#
# from django.contrib import admin
# from .models import Ruta, Bus
#
# @admin.register(Ruta)
# class RutaAdmin(admin.ModelAdmin):
#     list_display = ['nombre', 'origen', 'destino', 'tarifa_base']
#     list_filter = ['is_active']
#     search_fields = ['nombre']
#
# Esto crea entradas en http://localhost:8000/admin/


# ============================================================
# 6. MIGRATIONS - Gestión del esquema de BD
# ============================================================
#
# Comandos esenciales:
#   python manage.py makemigrations  # Genera archivos de migración
#   python manage.py migrate         # Aplica migraciones a la BD
#   python manage.py showmigrations  # Lista todas las migraciones
#   python manage.py sqlmigrate 0001 # SQL de una migración específica


# ============================================================
# 7. MANAGERS - Consultas personalizadas
# ============================================================
#
# class BusManager(models.Manager):
#     def disponibles(self):
#         return self.filter(estado='disponible')
#
#     def por_ruta(self, ruta_nombre):
#         return self.filter(ruta__nombre=ruta_nombre)
#
# class Bus(models.Model):
#     objects = BusManager()  # Se usa: Bus.objects.disponibles()


# ============================================================
# 8. SEÑALES (SIGNALS) - Eventos post-save
# ============================================================
#
# from django.db.models.signals import post_save
# from django.dispatch import receiver
#
# @receiver(post_save, sender=Viaje)
# def actualizar_estado_bus(sender, instance, **kwargs):
#     """Cuando se crea un viaje, marcar el bus como 'en_servicio'."""
#     if instance.estado == 'programado':
#         instance.bus.estado = 'en_servicio'
#         instance.bus.save()
