from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import usuarioAlum, usuarioPro
from .serializers import usuarioAlumSerializer, usuarioProSerializer
from django.contrib.auth.hashers import make_password

#Vistas existentes
class usuarioAlumViewSet(generics.ListAPIView):
    queryset = usuarioAlum.objects.all()
    serializer_class = usuarioAlumSerializer

class usuarioProViewSet(generics.ListAPIView):
    queryset = usuarioPro.objects.all()
    serializer_class = usuarioProSerializer

#Nueva vista para verificar el código de seguridad de un usuario
class VerificarCodigoSeguridad(APIView):
    def get(self, request):
        usuario = request.query_params.get('usuario')
        usuario_obj = usuarioAlum.objects.filter(nombre_usuario=usuario).first() or usuarioPro.objects.filter(nombre_usuario=usuario).first()

        if usuario_obj:
            return Response({'success': True, 'codigo': usuario_obj.codigo_seguridad})
        return Response({'success': False, 'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#Nueva vista para actualizar la contraseña de un usuario
class ActualizarContrasena(APIView):
    def put(self, request, usuario):
        nueva_contrasena = request.data.get('nuevaContrasena')
        usuario_obj = usuarioAlum.objects.filter(nombre_usuario=usuario).first() or usuarioPro.objects.filter(nombre_usuario=usuario).first()

        if usuario_obj:
            usuario_obj.contrasena = make_password(nueva_contrasena)
            usuario_obj.save()
            return Response({'success': True, 'message': 'Contraseña actualizada exitosamente'})

        return Response({'success': False, 'message': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)