import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-porcentaje',
  templateUrl: './porcentaje.page.html',
  styleUrls: ['./porcentaje.page.scss'],
})
export class PorcentajePage implements OnInit {

  //AQUI SE DEFINEN LAS CLASES QUE GUARDAMOS SOBRE LAS ASIGNATURAS Y LAS ASIGNATURAS ADICIONALES EN FORMA DE ARREGLOS
  asignaturas: { nombre: string; porcentaje: number }[] = [];
  asignaturasAdicionales: { nombre: string; porcentaje: number }[] = [
    { nombre: 'Ingles elemental', porcentaje: 0.85 },
    { nombre: 'aplicaciones moviles', porcentaje: 0.65 },
    { nombre: 'consulta de base de datos', porcentaje: 0.90 },
  ];

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.cargarAsignaturas();
  }


  //EN ESTA FUNCION OBTENEMOS Y CALCULAMOS EL PORCENTAJE DE LA ASISTENCIA PARA CADA UNA DE LAS ASIGNATURAS
  cargarAsignaturas() {
    this.afs.collection('asignaturas').valueChanges().subscribe((data: any[]) => {
      this.asignaturas = data.map(asignatura => { //RECORRE LA DATA USANDO EL "MAP"
        const clasesTotales = asignatura.clasesTotales || 0;
        const clasesAsistidas = asignatura.clasesAsistidas || 0;
        const porcentaje = clasesTotales > 0 ? (clasesAsistidas / clasesTotales) * 100 : 0;

        return {
          nombre: asignatura.nombre,
          porcentaje: porcentaje / 100 // EL PORCENTAJE SE ALMACENA COMO DECIMAL
        };
      });
    }, error => {
      console.error('Error al cargar asignaturas:', error);
    });
  }

  ////AQUI SOLO INCREMENTAS UN 10% LA ASISTENCIA 
  aumentarPorcentaje(index: number, tipo: string) {
    const maxPorcentaje = 1; // 100%

    if (tipo === 'asignaturas' && this.asignaturas[index].porcentaje < maxPorcentaje) {
      this.asignaturas[index].porcentaje += 0.1; // Aumenta en 10%
      if (this.asignaturas[index].porcentaje > maxPorcentaje) {
        this.asignaturas[index].porcentaje = maxPorcentaje; //  TIENE LIMITE DE 100%
      }
    } else if (tipo === 'asignaturasAdicionales' && this.asignaturasAdicionales[index].porcentaje < maxPorcentaje) {
      this.asignaturasAdicionales[index].porcentaje += 0.1; // Aumenta en 10%
      if (this.asignaturasAdicionales[index].porcentaje > maxPorcentaje) {
        this.asignaturasAdicionales[index].porcentaje = maxPorcentaje; // Limitar al 100%
      }
    }
  }
  disminuirPorcentaje(index: number, tipo: string) {
    const minPorcentaje = 0; // 0%
  
    if (tipo === 'asignaturas' && this.asignaturas[index].porcentaje > minPorcentaje) {
      this.asignaturas[index].porcentaje -= 0.1; // Disminuye en 10%
      if (this.asignaturas[index].porcentaje < minPorcentaje) {
        this.asignaturas[index].porcentaje = minPorcentaje; // Limitar al 0%
      }
    } else if (tipo === 'asignaturasAdicionales' && this.asignaturasAdicionales[index].porcentaje > minPorcentaje) {
      this.asignaturasAdicionales[index].porcentaje -= 0.1; // Disminuye en 10%
      if (this.asignaturasAdicionales[index].porcentaje < minPorcentaje) {
        this.asignaturasAdicionales[index].porcentaje = minPorcentaje; // Limitar al 0%
      }
    }
  }
}






