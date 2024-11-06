import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { CrudLoginService } from 'src/app/servicios/crudlogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private crudLoginService: CrudLoginService // Inyecta el servicio
  ) {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  validar() {
    if (this.formulario.valid) {
      const { nombre, password } = this.formulario.value;

      // Aquí puedes verificar el código de seguridad
      this.crudLoginService.verificarCodigoSeguridad(nombre).subscribe(
        response => {
          if (response.length > 0 && response[0].Contrasena === password) {
            // Iniciar sesión
            console.log("Bienvenido");
            localStorage.setItem("usuario", nombre); // Guardar usuario en el almacenamiento local
            this.navCtrl.navigateForward(['/listado-profe']);
          } else {
            this.presentAlert(); // Mostrar alerta si usuario o contraseña son incorrectos
          }
        },
        error => {
          console.error('Error al verificar el código de seguridad', error);
          this.presentAlert(); // Mostrar alerta si hay un error
        }
      );
    } else {
      this.presentAlert('Por favor completa todos los campos.'); // Alerta si el formulario no es válido
    }
  }

  async presentAlert(message: string = 'Usuario/contraseña incorrecto') {
    const alert = await this.alertController.create({
      header: '',
      subHeader: 'Usuario incorrecto',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

