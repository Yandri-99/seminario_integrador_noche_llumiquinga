from django.db import models
from django.contrib.auth.models import User
from .bus import Bus
from .route import Route


class Trip(models.Model):
    STATUS_CHOICES = [
        ('scheduled',   'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed',   'Completed'),
        ('cancelled',   'Cancelled'),
    ]

    driver     = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    bus        = models.ForeignKey(Bus, on_delete=models.PROTECT, related_name='trips')
    route      = models.ForeignKey(Route, on_delete=models.PROTECT, related_name='trips')
    departure  = models.DateTimeField()
    arrival    = models.DateTimeField(null=True, blank=True)
    status     = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    total_passengers = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-departure']

    def __str__(self):
        return f"Viaje #{self.id} - {self.route.code} ({self.departure}) - {self.status}"

    def calculate_passengers(self):
        self.total_passengers = sum(
            stop.passengers_on - stop.passengers_off
            for stop in self.stops.all()
        )
        self.save(update_fields=['total_passengers'])


class TripStop(models.Model):
    trip           = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='stops')
    stop_name      = models.CharField(max_length=200)
    stop_order     = models.PositiveIntegerField()
    passengers_on  = models.PositiveIntegerField(default=0)
    passengers_off = models.PositiveIntegerField(default=0)
    arrival_time   = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['stop_order']
        unique_together = ['trip', 'stop_order']

    @property
    def net_passengers(self):
        return self.passengers_on - self.passengers_off

    def __str__(self):
        return f"{self.trip.id} - Parada {self.stop_order}: {self.stop_name}"
