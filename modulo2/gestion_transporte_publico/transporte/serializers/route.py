from rest_framework import serializers
from transporte.models import Route


class RouteSerializer(serializers.ModelSerializer):
    total_buses = serializers.SerializerMethodField()

    class Meta:
        model  = Route
        fields = [
            'id', 'code', 'name', 'origin', 'destination',
            'distance', 'is_active', 'total_buses', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def get_total_buses(self, obj):
        return obj.buses.filter(is_active=True).count()

    def validate_code(self, value):
        qs = Route.objects.filter(code__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError('A route with this code already exists.')
        return value

    def validate_name(self, value):
        qs = Route.objects.filter(name__iexact=value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError('A route with this name already exists.')
        return value

    def validate_distance(self, value):
        if value <= 0:
            raise serializers.ValidationError('Distance must be greater than 0.')
        return value
