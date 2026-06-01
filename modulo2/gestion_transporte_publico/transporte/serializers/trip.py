from rest_framework import serializers
from transporte.models import Trip, TripStop, Bus
from transporte.serializers.bus import BusSummarySerializer


class TripStopSerializer(serializers.ModelSerializer):
    net_passengers = serializers.SerializerMethodField()

    class Meta:
        model  = TripStop
        fields = ['id', 'stop_name', 'stop_order', 'passengers_on', 'passengers_off', 'net_passengers', 'arrival_time']
        read_only_fields = ['id']

    def get_net_passengers(self, obj):
        return obj.net_passengers


class TripSerializer(serializers.ModelSerializer):
    stops        = TripStopSerializer(many=True, read_only=True)
    driver_name  = serializers.CharField(source='driver.username', read_only=True)
    bus_plate    = serializers.CharField(source='bus.plate', read_only=True)
    route_name   = serializers.CharField(source='route.name', read_only=True)
    num_stops    = serializers.SerializerMethodField()

    class Meta:
        model  = Trip
        fields = [
            'id', 'driver_name', 'bus', 'bus_plate', 'route', 'route_name',
            'departure', 'arrival', 'status',
            'total_passengers', 'num_stops', 'stops',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'total_passengers', 'created_at', 'updated_at']

    def get_num_stops(self, obj):
        return obj.stops.count()


class AddStopSerializer(serializers.Serializer):
    stop_name      = serializers.CharField(max_length=200)
    stop_order     = serializers.IntegerField(min_value=1)
    passengers_on  = serializers.IntegerField(default=0, min_value=0)
    passengers_off = serializers.IntegerField(default=0, min_value=0)

    def validate(self, data):
        if data['passengers_on'] == 0 and data['passengers_off'] == 0:
            raise serializers.ValidationError(
                'Stop must have at least one passenger on or off.'
            )
        return data
