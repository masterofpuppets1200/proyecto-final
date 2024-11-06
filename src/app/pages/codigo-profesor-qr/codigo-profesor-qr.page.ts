import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ClaseProcesoService } from 'src/app/clase-proceso.service';
import { QrCodeModule } from 'ng-qrcode';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
;


@Component({
  selector: 'app-codigo-profesor-qr',
  templateUrl: './codigo-profesor-qr.page.html',
  styleUrls: ['./codigo-profesor-qr.page.scss'],
})
export class CodigoProfesorQRPage implements OnInit {

  constructor(
    
    public ClaseProcesoService: ClaseProcesoService,
  
  ) { }

  ngOnInit() {
    this.claseEnProcesoDocente();
  }
  nombreUsuario:String= 'FreddyCampos';

  

  
  asignaturas: Observable<any[]>; // Cambia a un observable
  secciones: Observable<any[]>; // Cambia a un observable
  alumnos: Observable<any[]>; // Cambia a un observable
  horario: Observable<any[]>; // Cambia a un observable




  claseActualDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];

  claseProcesoDocente: { 
    asignaturaId: string, 
    seccionId: string,
    dia: string,
    horaInicio: string,
    horaFin: string }[] = [];



//Coleccion segun alumno
claseEnProcesoDocente() {
  this.asignaturas = this.ClaseProcesoService.TodasLasAsignaturas();
  this.asignaturas.subscribe(asignaturas => {
    // Aquí empieza la iteración sobre los valores
    for (const asignatura of asignaturas) {
      // Asegúrate de que asignatura.id existe
      this.secciones = this.ClaseProcesoService.SeccionesPorAsignatura(asignatura.id);
      this.secciones.subscribe(secciones => {
        // Aquí empieza la iteración sobre los valores
        for (const seccion of secciones) {
          if (seccion.profesor === this.nombreUsuario) {
            this.horario = this.ClaseProcesoService.horarioAsignatura(asignatura.id, seccion.id);
            this.horario.subscribe(horario => {
              // Aquí empieza la iteración sobre los valores
              for (const hora of horario) {
                this.claseProcesoDocente.push({
                  asignaturaId: asignatura.id,
                  seccionId: seccion.id,
                  dia: hora.id,
                  horaInicio: hora["Hora Inicio"],
                  horaFin: hora["Hora Fin"]

                });
                
                
              }
              // Llama a claseEnProcesoMetodo aquí, después de llenar vecesCombinadas
              this.claseEnProcesoMetodoDocente();
            });
          }
        }
      });
    }
  });
}

  claseEnProcesoMetodoDocente() {
    this.claseActualDocente = []; // Limpiar el array al inicio
    for (const item of this.claseProcesoDocente) {  
        console.log((item.dia+item.horaInicio+item.horaFin))
        console.log(this.ClaseProcesoService.verificarHorario(item.dia,item.horaInicio,item.horaFin))
        if (this.ClaseProcesoService.verificarHorario(item.dia,item.horaInicio,item.horaFin)) {
          this.claseActualDocente.push(item);

          //DATOS A ENTREGAR EN EL QR
          this.ClaseProcesoService.asignaturaNombre = item.asignaturaId;
          console.log(this.ClaseProcesoService.asignaturaNombre);

          this.ClaseProcesoService.seccionNombre = item.seccionId;
          console.log(this.ClaseProcesoService.seccionNombre);

          this.ClaseProcesoService.dia = item.dia;
          console.log(this.ClaseProcesoService.dia);
          
          this.ClaseProcesoService.horaInicio = item.horaInicio;
          console.log(this.ClaseProcesoService.horaInicio);

          this.ClaseProcesoService.horaFin = item.horaFin;
          console.log(this.ClaseProcesoService.horaFin);

          
          
        }
    }
  }



}

