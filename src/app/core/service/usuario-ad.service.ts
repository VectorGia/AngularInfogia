import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioADService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

  getAllUsuariosAD(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}/api/UsersAD`)
  }

  postUsuario(model: any): Observable<Usuario>{
    console.log("ap",model)
    return this.http.post<Usuario>(`${this.url}/api/UsersAD`, model, httpOptions).pipe(
      tap((usuario: Usuario) => console.log(`added usuario w/ id=${usuario.STR_NOMBRE_USUARIO}`))
    )
  }
}
