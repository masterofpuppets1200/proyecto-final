from django.urls import re_path as url
from .views import usuarioAlumViewSet, usuarioProViewSet, VerificarCodigoSeguridad, ActualizarContrasena
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^core/usuarioAlum/$', usuarioAlumViewSet.as_view(), name='usuarios_alum'),
    url(r'^core/usuarioPro/$', usuarioProViewSet.as_view(), name='usuarios_pro'),
    url(r'^core/verificar-codigo/$', VerificarCodigoSeguridad.as_view(), name='verificar_codigo_seguridad'),
    url(r'^core/usuarios/(?P<usuario>[^/.]+)/actualizar-contrasena/$', ActualizarContrasena.as_view(), name='actualizar_contrasena'),
]

urlpatterns = format_suffix_patterns(urlpatterns)