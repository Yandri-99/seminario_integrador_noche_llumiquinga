# mp_database_relations.py
# Relaciones de base de datos en el dominio de transporte público.
# Guía educativa: ForeignKey, OneToOne, ManyToMany con ejemplos prácticos.
# Basado en las relaciones de shopapi y vehiculos_api.


# ============================================================
# DIAGRAMA DE RELACIONES DEL SISTEMA DE TRANSPORTE
# ============================================================
#
#   Flota (1) ──────< (N) Bus
#   Ruta  (1) ──────< (N) Bus
#   Ruta  (1) ──────< (N) Parada
#   Bus   (1) ──────< (N) Viaje
#   Ruta  (1) ──────< (N) Viaje
#   User  (1) ──────< (N) Viaje (conductor)
#
#  < = ForeignKey (muchos a uno)


# ============================================================
# 1. FOREIGNKEY - Relación "Muchos a Uno"
# ============================================================
# La relación más usada: muchos registros apuntan a UNO.
#
# EJEMPLO: Muchos buses pertenecen A UNA ruta
#
# class Bus(models.Model):
#     ruta = models.ForeignKey(
#         Ruta,                        # Modelo relacionado
#         on_delete=models.PROTECT,    # Qué hacer al eliminar la ruta
#         related_name="buses",       # Nombre inverso: ruta.buses.all()
#     )
#
# CREAR:
#     ruta_10 = Ruta.objects.get(nombre="Ruta 10")
#     bus = Bus.objects.create(placa="ABC-123", ruta=ruta_10)
#
# CONSULTAR:
#     bus.ruta              # -> Objeto Ruta (acceso directo)
#     bus.ruta.nombre       # -> "Ruta 10"
#     ruta_10.buses.all()   # -> Todos los buses de Ruta 10
#     ruta_10.buses.count() # -> Cantidad de buses
#
# FILTRAR:
#     Bus.objects.filter(ruta__nombre="Ruta 10")  # Buses de Ruta 10
#     Bus.objects.filter(ruta__is_active=True)     # Buses en rutas activas
#
# ELIMINACIÓN (on_delete):
#     CASCADE     -> Eliminar ruta elimina sus buses (cascada)
#     PROTECT     -> No permite eliminar ruta si tiene buses
#     SET_NULL    -> Los buses quedan con ruta=NULL
#     DO_NOTHING  -> No hace nada (puede romper integridad)
#     SET_DEFAULT -> Los buses cambian a ruta por defecto


# ============================================================
# 2. ONETToOneFIELD - Relación "Uno a Uno"
# ============================================================
# Un registro se relaciona con exactamente uno otro.
#
# EJEMPLO: Cada bus tiene UNA ficha técnica
#
# class FichaTecnica(models.Model):
#     bus = models.OneToOneField(
#         Bus,
#         on_delete=models.CASCADE,
#         related_name="ficha_tecnica",
#     )
#     motor = models.CharField(max_length=100)
#     kilometraje = models.IntegerField(default=0)
#     ultima_revision = models.DateField()
#
# CREAR:
#     bus = Bus.objects.get(placa="ABC-123")
#     ficha = FichaTecnica.objects.create(
#         bus=bus,
#         motor="Cummins ISBe",
#         kilometraje=50000,
#     )
#
# CONSULTAR:
#     bus.ficha_tecnica              # -> Objeto FichaTecnica
#     bus.ficha_tecnica.motor        # -> "Cummins ISBe"
#     FichaTecnica.objects.get(bus=bus)  # -> Busca por bus


# ============================================================
# 3. MANYTOMANYFIELD - Relación "Muchos a Muchos"
# ============================================================
# Un registro se relaciona con múltiples registros y viceversa.
#
# EJEMPLO: Un viaje puede tener múltiples paradas programadas
#
# class ParadaProgramada(models.Model):
#     viaje = models.ForeignKey(Viaje, on_delete=models.CASCADE)
#     parada = models.ForeignKey(Parada, on_delete=models.CASCADE)
#     hora_llegada = models.TimeField()
#     hora_salida = models.TimeField()
#
# O usando ManyToManyField:
# class Viaje(models.Model):
#     paradas = models.ManyToManyField(Parada, through='ParadaProgramada')
#
# CREAR:
#     viaje.paradas.add(parada_1, parada_2, parada_3)
#
# CONSULTAR:
#     viaje.paradas.all()           # -> Todas las paradas del viaje
#     viaje.paradas.filter(nombre="Centro")  # Filtrar


# ============================================================
# 4. SELECT_RELATED Y PREFETCH RELATED (OPTIMIZACIÓN)
# ============================================================
# Evitan el problema N+1 de consultas a la base de datos.
#
# N+1: Cada objeto padre genera UNA consulta adicional para hijo.
#
# --- MALO (N+1 queries) ---
# buses = Bus.objects.all()
# for bus in buses:
#     print(bus.ruta.nombre)  # 1 query por cada bus!
#
# --- BUENO (1 query con JOIN) ---
# buses = Bus.objects.select_related("ruta").all()
# for bus in buses:
#     print(bus.ruta.nombre)  # Ya está cargado, 0 queries extra
#
# --- prefetch_related (para relaciones inversas) ---
# rutas = Ruta.objects.prefetch_related("buses").all()
# for ruta in rutas:
#     print(ruta.buses.count())  # 1 query extra, no N
#
# REGLA:
#   select_related  -> ForeignKey y OneToOne (queries de 1 nivel)
#   prefetch_related -> Relaciones inversas y ManyToMany
#
# EJEMPLO EN VIEWSET:
#     queryset = Viaje.objects.select_related(
#         "bus", "ruta", "conductor"
#     ).prefetch_related(
#         "bus__ruta"  # Si necesitas datos de ruta a través del bus
#     )


# ============================================================
# 5. RELATED_NAME - Nombre de la relación inversa
# ============================================================
# Permite acceder desde el modelo padre a sus hijos.
#
# class Bus(models.Model):
#     ruta = models.ForeignKey(
#         Ruta,
#         on_delete=models.CASCADE,
#         related_name="buses",  # <- Este es el related_name
#     )
#
# Ahora:
#     ruta = Ruta.objects.get(nombre="Ruta 10")
#     ruta.buses.all()           # Todos los buses de esa ruta
#     ruta.buses.filter(estado="disponible")  # Filtrar
#     ruta.buses.count()         # Contar
#
# Si no se define related_name, Django genera: bus_set
#     ruta.bus_set.all()


# ============================================================
# 6. EJEMPLO COMPLETO: CREAR UN VIAJE CON SUS RELACIONES
# ============================================================
#
# from transporte.models import Flota, BusCatalogo, Ruta, Bus, Viaje, Parada
#
# # 1. Crear flota
# flota = Flota.objects.create(nombre="TransEcuador")
#
# # 2. Crear ruta
# ruta = Ruta.objects.create(
#     nombre="Ruta 10",
#     origen="Terminal Terrestre",
#     destino="Centro Histórico",
#     tarifa_base=0.35,
# )
#
# # 3. Crear bus en la ruta
# bus = Bus.objects.create(
#     ruta=ruta,
#     placa="ABC-1234",
#     modelo="Hyundai Universe",
#     anio_fabricacion=2020,
#     capacidad=45,
# )
#
# # 4. Crear paradas de la ruta
# Parada.objects.create(ruta=ruta, nombre="Terminal", orden=1)
# Parada.objects.create(ruta=ruta, nombre="Plaza del Tejar", orden=2)
# Parada.objects.create(ruta=ruta, nombre="Centro Histórico", orden=3)
#
# # 5. Crear viaje
# viaje = Viaje.objects.create(
#     bus=bus,
#     ruta=ruta,
#     fecha_salida="2026-07-26T08:00:00Z",
# )
#
# # 6. Consultar con relaciones
# viaje = Viaje.objects.select_related(
#     "bus", "ruta"
# ).prefetch_related(
#     "ruta__paradas"
# ).get(id=viaje.id)
#
# print(f"Bus: {viaje.bus.placa}")        # "ABC-1234"
# print(f"Ruta: {viaje.ruta.nombre}")      # "Ruta 10"
# print(f"Paradas: {viaje.ruta.paradas.count()}")  # 3
