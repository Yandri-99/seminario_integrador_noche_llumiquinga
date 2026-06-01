from django.contrib import admin
from transporte.models import Route, Bus, Trip, TripStop


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display  = ['id', 'code', 'name', 'origin', 'destination', 'distance', 'is_active']
    list_filter   = ['is_active']
    search_fields = ['name', 'code', 'origin', 'destination']
    list_editable = ['is_active']


@admin.register(Bus)
class BusAdmin(admin.ModelAdmin):
    list_display  = ['id', 'plate', 'brand', 'model', 'year', 'capacity', 'is_active', 'route']
    list_filter   = ['is_active', 'brand', 'route']
    search_fields = ['plate', 'brand', 'model']
    list_editable = ['is_active']


class TripStopInline(admin.TabularInline):
    model  = TripStop
    extra  = 1
    fields = ['stop_name', 'stop_order', 'passengers_on', 'passengers_off', 'arrival_time']


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display    = ['id', 'driver', 'bus', 'route', 'departure', 'status', 'total_passengers']
    list_filter     = ['status']
    search_fields   = ['driver__username', 'bus__plate', 'route__name']
    inlines         = [TripStopInline]
    readonly_fields = ['total_passengers', 'created_at', 'updated_at']
