from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count

from transporte.models           import Route
from transporte.serializers.route import RouteSerializer
from transporte.permissions      import IsStaffOrReadOnly
from transporte.filters          import RouteFilter
from transporte.pagination       import StandardPagination


class RouteViewSet(viewsets.ModelViewSet):
    queryset           = Route.objects.all()
    serializer_class   = RouteSerializer
    permission_classes = [IsStaffOrReadOnly]
    pagination_class   = StandardPagination
    filter_backends    = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class    = RouteFilter
    search_fields      = ['name', 'code', 'origin', 'destination']
    ordering_fields    = ['name', 'created_at']
    ordering           = ['name']

    @action(detail=True, methods=['get'], url_path='buses')
    def active_buses(self, request, pk=None):
        from transporte.models import Bus
        from transporte.serializers.bus import BusSummarySerializer
        route = self.get_object()
        qs   = route.buses.filter(is_active=True).order_by('plate')
        page = self.paginate_queryset(qs)
        if page is not None:
            return self.get_paginated_response(
                BusSummarySerializer(page, many=True).data
            )
        return Response(BusSummarySerializer(qs, many=True).data)

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        qs = Route.objects.annotate(num_buses=Count('buses', distinct=True))
        return Response({
            'total':    qs.count(),
            'active':   qs.filter(is_active=True).count(),
            'inactive': qs.filter(is_active=False).count(),
            'detail': [
                {
                    'id':        r.id,
                    'code':      r.code,
                    'name':      r.name,
                    'num_buses': r.num_buses,
                    'is_active': r.is_active,
                }
                for r in qs.order_by('name')
            ],
        })
