from django.db import models
from .route import Route


class Bus(models.Model):
    plate     = models.CharField(max_length=20, unique=True, help_text="Placa del bus")
    brand     = models.CharField(max_length=100)
    model     = models.CharField(max_length=100)
    year      = models.PositiveIntegerField()
    capacity  = models.PositiveIntegerField(help_text="Capacidad maxima de pasajeros")
    is_active = models.BooleanField(default=True)
    route     = models.ForeignKey(
        Route,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='buses',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = 'Bus'
        verbose_name_plural = 'Buses'
        ordering            = ['plate']

    def __str__(self):
        return f"{self.plate} - {self.brand} {self.model} ({self.capacity} asientos)"

    @property
    def available_seats(self):
        return self.capacity

    @property
    def is_assigned(self):
        return self.route is not None
