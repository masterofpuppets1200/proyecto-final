import { Injectable } from '@angular/core';

import { profesor } from 'src/app/model/profesor';
import  {Alumno} from 'src/app/model/Alumno';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, combineLatest } from 'rxjs';
// Importaciones
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioLogin {
  

  constructor(private afs: AngularFirestore) { }

  public nombreAlumno: string = "";
  public tipoUsuario: string = "";

  obtenerUsuarios(): Observable<any[]> {
    return this.afs.collection("Usuarios").valueChanges();
  }

  iniciarSesion(nombreUsuario: string, contrasena: string) {
    return this.afs.collection("Usuarios", ref => ref
      .where("Usuario", "==", nombreUsuario)
      .where("Contrasena", "==", contrasena)).valueChanges();
  }

  actualizarContrasenaEnFirestore(nombreUsuario: string, nuevaContrasena: string): Promise<void> {
    return this.afs.collection("Usuarios", ref => ref.where("Usuario", "==", nombreUsuario))
      .get()
      .toPromise()
      .then(querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            doc.ref.update({ Contrasena: nuevaContrasena });
          });
        }
      });
  }

  solicitudCodigoSeguridad(nombreUsuario: string) {
    return this.afs.collection("Usuarios", 
      ref => ref.where("Usuario", "==", nombreUsuario))
      .valueChanges();
  }

}
