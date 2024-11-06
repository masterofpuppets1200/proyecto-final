import { Component, OnInit } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { ClaseProcesoService } from '../../clase-proceso.service';

@Component({
  selector: 'app-mostrar-qr',
  templateUrl: './mostrar-qr.page.html',
  styleUrls: ['./mostrar-qr.page.scss'],
})
export class MostrarQRPage implements OnInit {

  public datosAsignaturaDocente: string[];
  public datosAsignaturaJSON: string;

  constructor(private claseProcesoService: ClaseProcesoService) { }

  ngOnInit() {
    this.datosAsignaturaDocente = [
      this.claseProcesoService.asignaturaNombre,
      this.claseProcesoService.seccionNombre,
      this.claseProcesoService.dia,
      this.claseProcesoService.horaInicio,
      this.claseProcesoService.horaFin
    ];

    this.datosAsignaturaJSON = JSON.stringify(this.datosAsignaturaDocente);

    // Muestra el primer elemento de datosAsignaturaDocente
    console.log(this.datosAsignaturaDocente[0]);

    // Muestra el contenido completo en formato JSON
    console.log(this.datosAsignaturaJSON);
  }
}
