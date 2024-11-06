import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Alumno } from '../model/Alumno';
@Injectable({
  providedIn: 'root'
})
export class CurdAPIService {

  constructor(private http:HttpClient) { }
  //apis de prueba funcionan como tal y muestran las vistas
  rutaAPI="http://127.0.0.1:8000/core/usuarioPro/"
  Ruta2api= "http://127.0.0.1:8000/core/usuarioAlum/"
  rutapython="https://bossflarion.pythonanywhere.com/core/usuarioAlum/"
  
 obtener():Observable<any>{
  return this.http.get(this.rutapython).pipe(retry(3))

 }
}
