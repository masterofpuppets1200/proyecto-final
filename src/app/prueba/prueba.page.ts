import { Component, OnInit } from '@angular/core';
import { ServiciosAsignaturaService } from '../servicios/servicios-asignatura.service'; 

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
})
export class PruebaPage implements OnInit {

  // Inyecta el servicio en el constructor
  constructor(private hh: ServiciosAsignaturaService) { }

  filtradaAsignaturas: any[] = [];
  TodaAsignatura: any[] = [];
  SeccionesPorAsignatura: { [key: string]: any[] } = {};
  AlumnosPorSeccion: { [key: string]: { [key: string]: any[] } } = {};
  AsistenciaPorAlumno: { [key: string]: { [key: string]: { [key: string]: any } } } = {};
  usuario1: string | null = '';

  ngOnInit() {
    this.consulta(); // Realiza la consulta inicial
  }

  // Método para consultar asignaturas, secciones y alumnos
  consulta() {
    this.hh.obtenerTodasLasAsignaturas().subscribe(data => {
      this.TodaAsignatura = data; 

      this.TodaAsignatura.forEach(curso => {
        if (!this.SeccionesPorAsignatura[curso.id]) {
          this.SeccionesPorAsignatura[curso.id] = [];
        }

        this.hh.obtenerSeccionesPorAsignatura(curso.id).subscribe(secciones => {
          this.SeccionesPorAsignatura[curso.id] = secciones;

          secciones.forEach(seccion => {
            if (!this.AlumnosPorSeccion[curso.id]) {
              this.AlumnosPorSeccion[curso.id] = {};
            }
            if (!this.AlumnosPorSeccion[curso.id][seccion.id]) {
              this.AlumnosPorSeccion[curso.id][seccion.id] = [];
            }

            this.hh.obtenerAlumnosPorSeccion(curso.id, seccion.id).subscribe(alumnos => {
              this.AlumnosPorSeccion[curso.id][seccion.id] = alumnos;

              alumnos.forEach(alumno => {
                this.hh.obtenerEstadoAsistenciaAlumno(curso.id, seccion.id, alumno.id).subscribe(asistencia => {
                  if (!this.AsistenciaPorAlumno[curso.id]) {
                    this.AsistenciaPorAlumno[curso.id] = {};
                  }
                  if (!this.AsistenciaPorAlumno[curso.id][seccion.id]) {
                    this.AsistenciaPorAlumno[curso.id][seccion.id] = {};
                  }

                  this.AsistenciaPorAlumno[curso.id][seccion.id][alumno.id] = Array.isArray(asistencia) ? asistencia : [];
                });
              });
            });
          });
        });
      });
    });
  }

  // Filtra asignaturas por ID
  filtrarPorAsignatura(event: any) {
    const asignaturaId = event.detail.value;
    console.log("ID seleccionada:", asignaturaId);

    if (asignaturaId) {
      this.filtradaAsignaturas = this.TodaAsignatura.filter(asignatura => asignatura.id === asignaturaId);
    } else {
      this.filtradaAsignaturas = this.TodaAsignatura;
    }

    console.log("Asignaturas filtradas:", this.filtradaAsignaturas);
  }

}

