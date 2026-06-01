from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from transporte.models import Trip, TripStop, Bus
from transporte.serializers.trip import TripSerializer, AddStopSerializer
from transporte.permissions import IsOwnerOrStaff
from transporte.filters    import TripFilter
from transporte.pagination import StandardPagination


class TripViewSet(viewsets.ModelViewSet):
    serializer_class   = TripSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrStaff]
    pagination_class   = StandardPagination
    filter_backends    = [DjangoFilterBackend, OrderingFilter]
    filterset_class    = TripFilter
    ordering_fields    = ['departure', 'total_passengers']
    ordering           = ['-departure']
    http_method_names  = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        if self.request.user.is_staff:
            return (
                Trip.objects
                .select_related('driver', 'bus', 'route')
                .prefetch_related('stops')
                .all()
            )
        return (
            Trip.objects
            .filter(driver=self.request.user)
            .prefetch_related('stops')
        )

    def perform_create(self, serializer):
        serializer.save(driver=self.request.user)

    @action(detail=True, methods=['post'], url_path='add-stop')
    def add_stop(self, request, pk=None):
        trip = self.get_object()
        if trip.status != 'scheduled':
            return Response(
                {'error': f'Cannot modify a trip with status "{trip.status}".'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = AddStopSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        stop, created = TripStop.objects.get_or_create(
            trip=trip,
            stop_order=serializer.validated_data['stop_order'],
            defaults={
                'stop_name':      serializer.validated_data['stop_name'],
                'passengers_on':  serializer.validated_data.get('passengers_on', 0),
                'passengers_off': serializer.validated_data.get('passengers_off', 0),
            },
        )
        if not created:
            return Response(
                {'error': f'Stop at order {stop.stop_order} already exists.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        trip.calculate_passengers()
        return Response(TripSerializer(trip).data)

    @action(detail=True, methods=['post'], url_path='start')
    def start(self, request, pk=None):
        trip = self.get_object()
        if trip.status != 'scheduled':
            return Response(
                {'error': 'Only scheduled trips can be started.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if not trip.stops.exists():
            return Response(
                {'error': 'Cannot start a trip with no stops.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        trip.status = 'in_progress'
        trip.save(update_fields=['status'])
        return Response(TripSerializer(trip).data)

    @action(
        detail=True,
        methods=['post'],
        permission_classes=[IsAdminUser],
        url_path='update-status',
    )
    def update_status(self, request, pk=None):
        trip          = self.get_object()
        new_status    = request.data.get('status')
        valid_statuses = [s[0] for s in Trip.STATUS_CHOICES]

        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid status. Valid options: {valid_statuses}'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        trip.status = new_status
        trip.save(update_fields=['status'])
        return Response(TripSerializer(trip).data)

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[IsAdminUser],
        url_path='stats',
    )
    def stats(self, request):
        from django.db.models import Count, Sum
        qs     = Trip.objects.all()
        totals = qs.aggregate(
            total_trips   = Count('id'),
            total_passengers = Sum('total_passengers'),
        )
        by_status = {
            s: qs.filter(status=s).count()
            for s, _ in Trip.STATUS_CHOICES
        }
        return Response({
            'total_trips':      totals['total_trips'],
            'total_passengers': float(totals['total_passengers'] or 0),
            'by_status':        by_status,
        })
