from django.db import models


class Route(models.Model):
    name        = models.CharField(max_length=100, unique=True)
    code        = models.CharField(max_length=20, unique=True)
    origin      = models.CharField(max_length=150)
    destination = models.CharField(max_length=150)
    distance    = models.DecimalField(max_digits=8, decimal_places=2, help_text="Distancia en km")
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name        = 'Route'
        verbose_name_plural = 'Routes'
        ordering            = ['name']

    def __str__(self):
        return f"{self.code} - {self.name} ({self.origin} -> {self.destination})"
