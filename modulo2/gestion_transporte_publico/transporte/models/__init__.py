# transporte/models/__init__.py
from .route import Route
from .bus   import Bus
from .trip  import Trip, TripStop

__all__ = ['Route', 'Bus', 'Trip', 'TripStop']
