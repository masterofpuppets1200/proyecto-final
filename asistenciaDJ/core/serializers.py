from typing import __all__
from .models import *
from rest_framework import serializers  


class usuarioAlumSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarioAlum
        fields = "__all__"
    
    
class usuarioProSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarioPro
        fields = "__all__"