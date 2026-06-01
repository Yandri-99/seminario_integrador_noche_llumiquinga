class NotificacionTransporte:
    def __init__(self, destinatario, mensaje):
        self.destinatario = destinatario
        self.mensaje = mensaje

    def enviar(self):
        raise NotImplementedError("Las subclases deben implementar enviar()")

    def __str__(self):
        return f"{self.__class__.__name__} -> {self.destinatario}"


class NotificacionEmail(NotificacionTransporte):
    def __init__(self, destinatario, mensaje, asunto="Sin asunto"):
        super().__init__(destinatario, mensaje)
        self.asunto = asunto

    def enviar(self):
        return f"Email a {self.destinatario}: [{self.asunto}] {self.mensaje}"


class NotificacionSMS(NotificacionTransporte):
    MAX_CHARS = 160

    def enviar(self):
        msg = self.mensaje[:self.MAX_CHARS]
        return f"SMS a {self.destinatario}: {msg}"


class NotificacionApp(NotificacionTransporte):
    def enviar(self):
        return f"Push a {self.destinatario}: {self.mensaje[:50]}..."


class NotificacionRadio(NotificacionTransporte):
    def __init__(self, canal, mensaje):
        super().__init__(canal, mensaje)

    def enviar(self):
        return f"Radio #{self.destinatario}: {self.mensaje}"


def notificar_todos(notificaciones):
    for notif in notificaciones:
        print(f"  {notif.enviar()}")


alertas = [
    NotificacionEmail("operaciones@transporte.com", "Bus 101 retrasado 15 min", "Alerta Ruta Norte"),
    NotificacionSMS("0999123456", "Su bus llegara en 5 min a la parada Centro"),
    NotificacionApp("usuario-abc", "Desvio en ruta Sur - tome rutas alternativas"),
    NotificacionRadio("Canal Emergencia", "Accidente en Av. Principal - desviar buses"),
]

print("Enviando notificaciones de transporte:")
notificar_todos(alertas)


class ReportePDF:
    def generar(self):
        return "Reporte generado en PDF con datos de la flota"

    def imprimir(self, datos):
        print(f"Imprimiendo PDF: {datos[:30]}...")


class ReporteExcel:
    def generar(self):
        return "Reporte generado en Excel con estadisticas de rutas"

    def imprimir(self, datos):
        print(f"Exportando a Excel: {datos[:30]}...")


class ReporteWeb:
    def generar(self):
        return "Reporte publicado en dashboard web del transporte"

    def imprimir(self, datos):
        print(f"Actualizando web: {datos[:30]}...")


def procesar_reporte(reporte):
    contenido = reporte.generar()
    print(f"Procesando: {contenido}")
    reporte.imprimir(f"resultado_{contenido}")


for reporte in [ReportePDF(), ReporteExcel(), ReporteWeb()]:
    procesar_reporte(reporte)
