import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getAllRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.url}/api/Rol`)
  }
    postRol(rol): Observable<Rol>{
    return this.http.post<Rol>(`${this.url}/api/Rol`, rol, httpOptions).pipe(
      tap((rol: Rol) => console.log(`added proyecto w/ id=${rol.STR_NOMBRE_ROL}`))
    )}
}
