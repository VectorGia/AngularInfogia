import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permisos } from '../models/permiso';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getAllPermisos(): Observable<Permisos[]>{
    return this.http.get<Permisos[]>(`${this.url}/api/Permiso`)
  }

  getPermiso(id: string){
    console.log(id)
    return this.http.get<Permisos>(`${this.url}/api/Permiso/${id}`)
  }
  addPermiso(negocio): Observable<Permisos>{
    return this.http.post<Permisos>(`${this.url}/api/Permiso`,negocio, httpOptions).pipe(
      tap((negocio: Permisos) => console.log(`added negocio w/ id=${negocio.INT_IDPERMISO_P}`))
    )
  }
  updatePermiso(id: string, changes: Partial<Permisos>){
    return this.http.put(`${this.url}/api/Permiso/${id}`, changes, httpOptions);
  }
  deletePermiso(id: string){
    return this.http.delete(`${this.url}/api/Permiso/${id}`, httpOptions)
  }
}
