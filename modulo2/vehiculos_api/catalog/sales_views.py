from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
def promedio_ventas(request):
    """
    Endpoint POST:
    /api/products/promedio-ventas/

    Body JSON:
    {
        "productos": [
            {
                "nombre": "Laptop",
                "ventas": 1000
            },
            {
                "nombre": "Mouse",
                "ventas": 500
            }
        ]
    }
    """

    try:
        productos = request.data.get('productos')

        if not productos or not isinstance(productos, list):
            return Response(
                {
                    'error': 'Debe enviar un arreglo de productos'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        total_ventas = 0

        for producto in productos:

            ventas = float(producto.get('ventas', 0))

            total_ventas += ventas

        promedio = total_ventas / len(productos)

        return Response({
            'cantidad_productos': len(productos),
            'total_ventas': total_ventas,
            'promedio_ventas': promedio
        })

    except Exception as e:
        return Response(
            {
                'error': str(e)
            },
            status=status.HTTP_400_BAD_REQUEST
        )
