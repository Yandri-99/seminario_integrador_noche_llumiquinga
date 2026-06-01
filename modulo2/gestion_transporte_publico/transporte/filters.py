import django_filters
from transporte.models import Route, Bus, Trip


class RouteFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr='icontains')
    code = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model  = Route
        fields = ['is_active']


class BusFilter(django_filters.FilterSet):
    plate     = django_filters.CharFilter(lookup_expr='icontains')
    brand     = django_filters.CharFilter(lookup_expr='icontains')
    capacity_min = django_filters.NumberFilter(field_name='capacity', lookup_expr='gte')
    capacity_max = django_filters.NumberFilter(field_name='capacity', lookup_expr='lte')
    route_name   = django_filters.CharFilter(
        field_name='route__name', lookup_expr='icontains'
    )

    class Meta:
        model  = Bus
        fields = ['is_active', 'route']


class TripFilter(django_filters.FilterSet):
    from_date = django_filters.DateFilter(field_name='departure', lookup_expr='date__gte')
    to_date   = django_filters.DateFilter(field_name='departure', lookup_expr='date__lte')
    route_name = django_filters.CharFilter(
        field_name='route__name', lookup_expr='icontains'
    )
    bus_plate  = django_filters.CharFilter(
        field_name='bus__plate', lookup_expr='icontains'
    )

    class Meta:
        model  = Trip
        fields = ['status', 'driver']
