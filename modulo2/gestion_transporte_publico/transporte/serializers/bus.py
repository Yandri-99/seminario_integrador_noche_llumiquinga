from rest_framework import serializers
from transporte.models import Bus
from transporte.serializers.route import RouteSerializer


class BusSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model  = Bus
        fields = ['id', 'plate', 'brand', 'model', 'capacity', 'is_active']


class BusSerializer(serializers.ModelSerializer):
    route          = RouteSerializer(read_only=True)
    route_id       = serializers.PrimaryKeyRelatedField(
        source='route',
        write_only=True,
        queryset=Bus.objects.none(),
        allow_null=True,
    )
    available_seats = serializers.SerializerMethodField()
    is_assigned     = serializers.SerializerMethodField()

    class Meta:
        model  = Bus
        fields = [
            'id', 'plate', 'brand', 'model', 'year',
            'capacity', 'available_seats', 'is_assigned', 'is_active',
            'route', 'route_id',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        from transporte.models import Route
        self.fields['route_id'].queryset = Route.objects.filter(is_active=True)

    def get_available_seats(self, obj):
        return obj.available_seats

    def get_is_assigned(self, obj):
        return obj.is_assigned

    def validate_capacity(self, value):
        if value <= 0:
            raise serializers.ValidationError('Capacity must be greater than 0.')
        return value

    def validate_year(self, value):
        from datetime import date
        current_year = date.today().year
        if value < 2000 or value > current_year + 1:
            raise serializers.ValidationError(
                f'Year must be between 2000 and {current_year + 1}.'
            )
        return value
