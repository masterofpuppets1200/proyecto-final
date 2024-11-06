import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CrudLoginService } from 'src/app/servicios/crudlogin.service';
import { AlertController } from '@ionic/angular';
import { ServicioLogin } from '../../servicios/crudrestablecer.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RecuperarContrasenaPage {
  usuario: string = "";
  nuevaContrasena: string = "";
  codigoSeguridad: string = '';

  constructor(
    private controladorToast: ToastController,
    private servicioLogin: CrudLoginService,
    private controladorAlerta: AlertController,
    private servicioCrudApi: ServicioLogin,
  ) {}

  datosUsuario: any[] = [];

  limpiarCampos() {
    this.usuario = '';
    this.nuevaContrasena = '';
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.controladorToast.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: color,
    });
    toast.present();
  }

  async mostrarAlertaCodigo() {
    const alerta = await this.controladorAlerta.create({
      header: 'Ingresa código personal ',
      inputs: [
        {
          type: 'text',
          name: 'codigo', 
          placeholder: 'Código',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ingresar',
          handler: (datosAlerta) => {
            if (this.nuevaContrasena === "") {
              this.mostrarAlertaErrorContrasenaVacia();
            }
            if (this.nuevaContrasena !== "") {
              const codigoIngresado = datosAlerta.codigo; 
              this.servicioLogin.verificarCodigoSeguridad(this.usuario).subscribe(datos => {
                this.datosUsuario = datos;
                this.datosUsuario.forEach(elemento => {
                  if (elemento.Codigo === codigoIngresado) {
                    this.servicioLogin.actualizarContrasena(this.usuario, this.nuevaContrasena);
                    this.limpiarCampos();
                    this.mostrarToast('Contraseña actualizada correctamente, vuelve a ingresar.', 'success');
                  } else if (elemento.Codigo !== codigoIngresado) {
                    this.mostrarAlertaErrorCodigo();
                  }
                });
              });
            }
          }
        }
      ]
    });
    await alerta.present();
  }

  async mostrarAlertaErrorCodigo() {
    const alerta = await this.controladorAlerta.create({
      header: 'Error',
      message: 'Código incorrecto',
      buttons: ['OK']
    });

    await alerta.present();
  }

  async mostrarAlertaErrorContrasenaVacia() {
    const alerta = await this.controladorAlerta.create({
      header: 'Error',
      message: 'La nueva contraseña no puede estar vacía',
      buttons: ['OK']
    });

    await alerta.present();
  }

  validarEntradas() {
    if (this.usuario === "") {
      console.log("Campo usuario vacío");
      this.mostrarToast("Usuario inválido", "danger");
      return;
    }
    if (this.nuevaContrasena === "") {
      console.log("Campo contraseña vacío");
      this.mostrarToast("La nueva contraseña no puede estar vacía", "danger");
      return;
    }
    this.confirmarCodigoActualizacion();
  }

  async confirmarCodigoActualizacion() {
    const alerta = await this.controladorAlerta.create({
      header: 'Confirmar acción',
      message: 'Por favor, ingresa tu información.',
      inputs: [
        {
          name: 'campoEntrada',
          type: 'text',
          placeholder: 'Escribe algo aquí...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: (datos) => {
            const valorCampoEntrada = datos.campoEntrada;
            this.servicioCrudApi.obtenerUsuarios().subscribe((datos: any) => {
              for (let datosApi of datos) {
                if (this.usuario === datosApi.Correo) {
                  if (valorCampoEntrada !== datosApi.CodigoSeguridad) {
                    this.mostrarAlertaErrorCodigo();
                    return;
                  }
                  if (valorCampoEntrada === datosApi.CodigoSeguridad) {
                    this.servicioLogin.actualizarContrasena(this.usuario, this.nuevaContrasena);
                    this.mostrarToast("Contraseña actualizada correctamente", "success");
                    this.limpiarCampos();
                    return;
                  }
                }
              }
            });
          }
        }
      ]
    });

    await alerta.present();
  }
}