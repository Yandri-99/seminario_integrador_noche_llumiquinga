from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg, Max, Min, Sum, Count

from transporte.models          import Bus
from transporte.serializers.bus import BusSerializer, BusSummarySerializer
from transporte.permissions     import IsStaffOrReadOnly
from transporte.filters         import BusFilter
from transporte.pagination      import StandardPagination


class BusViewSet(viewsets.ModelViewSet):
    queryset           = Bus.objects.select_related('route').filter(is_active=True)
    serializer_class   = BusSerializer
    permission_classes = [IsStaffOrReadOnly]
    pagination_class   = StandardPagination
    filter_backends    = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class    = BusFilter
    search_fields      = ['plate', 'brand', 'model', 'route__name']
    ordering_fields    = ['plate', 'capacity', 'year', 'created_at']
    ordering           = ['plate']

    @action(
        detail=True,
        methods=['post'],
        permission_classes=[IsAdminUser],
        url_path='assign-route',
    )
    def assign_route(self, request, pk=None):
        bus = self.get_object()
        from transporte.models import Route
        try:
            route_id = int(request.data.get('route_id', 0))
            route = Route.objects.get(pk=route_id, is_active=True)
        except (ValueError, Route.DoesNotExist):
            return Response(
                {'error': 'Invalid or inactive route_id.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        bus.route = route
        bus.save(update_fields=['route'])
        return Response({
            'id':    bus.id,
            'plate': bus.plate,
            'route': route.name,
        })

    @action(
        detail=False,
        methods=['get'],
        permission_classes=[AllowAny],
        url_path='available',
    )
    def available(self, request):
        qs   = self.filter_queryset(
            self.get_queryset().filter(route__isnull=False, is_active=True)
        )
        page = self.paginate_queryset(qs)
        if page is not None:
            return self.get_paginated_response(
                BusSummarySerializer(page, many=True).data
            )
        return Response(BusSummarySerializer(qs, many=True).data)

    @action(
        detail=False,
        methods=['get'],
        url_path='stats',
    )
    def stats(self, request):
        qs      = Bus.objects.all()
        active  = qs.filter(is_active=True)
        data    = active.aggregate(
            total_active   = Count('id'),
            avg_capacity   = Avg('capacity'),
            max_capacity   = Max('capacity'),
            min_capacity   = Min('capacity'),
            total_seats    = Sum('capacity'),
        )
        data['total_inactive'] = qs.filter(is_active=False).count()
        data['unassigned']     = active.filter(route__isnull=True).count()
        if data['avg_capacity']:
            data['avg_capacity'] = round(float(data['avg_capacity']), 2)
        return Response(data)
