# mp_pagination.py
# Paginación estándar para la API de transporte público.
# Demuestra PageNumberPagination con configuración personalizada.
# Adaptado de shopapi store pagination.

from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    """
    Paginación estándar para la API de transporte.

    Uso:
        GET /api/rutas/?page=1&page_size=20

    Parámetros:
        - page: número de página (default=1)
        - page_size: elementos por página (default=10, max=100)

    Respuesta incluye:
        - count: total de registros
        - next: URL de la siguiente página
        - previous: URL de la página anterior
        - results: lista de elementos de la página actual
    """
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class SmallPagination(PageNumberPagination):
    """
    Paginación para listas pequeñas (ej: paradas de una ruta).
    """
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 50
