import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudLoginService {
  private apiUrl = 'https://bossflarion.pythonanywhere.com/core/usuarioAlum/'; // Cambia esta URL a la dirección de tu API de Django

  constructor(private http: HttpClient) {}

  verificarCodigoSeguridad(usuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verificar-codigo/`, { usuario });
}

  actualizarContrasena(usuario: string, nuevaContrasena: string): Promise<void> {
    // Usa backticks para interpolar la variable
    return this.http.put<void>(`${this.apiUrl}/usuarioAlum/${usuario}/actualizar-contrasena/`, {nuevaContrasena: nuevaContrasena}).toPromise();
  }
}