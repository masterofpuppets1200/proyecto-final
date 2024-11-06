from django.db import models

# Create your models here.
class usuarioAlum(models.Model):
    id=models.AutoField(primary_key=True)
    Nombre_completo=models.CharField(max_length=45,null=False)
    correo=models.CharField(max_length=50,null=False)
    contra=models.CharField(max_length=50,null=False)
    nombre_usuario=models.CharField(max_length=50,null=False)
    
    
def __str__(self):
    return self.nombre


class usuarioPro(models.Model):
    id=models.AutoField(primary_key=True)
    Nombre_completo=models.CharField(max_length=45,null=False)
    correo=models.CharField(max_length=50,null=False)
    contra=models.CharField(max_length=50,null=False)
    nombre_usuario=models.CharField(max_length=59,null=False)

def __str__(self):
    return self.nombre
   