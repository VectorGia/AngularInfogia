import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pantalla } from '../models/pantalla';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class PantallaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  getAllPantallas(): Observable<Pantalla[]>{
    return this.http.get<Pantalla[]>(`${this.url}/api/Pantalla`)
  }

  getPantalla(id: string){
    console.log(id)
    return this.http.get<Pantalla>(`${this.url}/api/Pantalla/${id}`)
  }
  addPantalla(negocio): Observable<Pantalla>{
    return this.http.post<Pantalla>(`${this.url}/api/Pantalla`,negocio, httpOptions).pipe(
      tap((negocio: Pantalla) => console.log(`added negocio w/ id=${negocio.INT_IDPANTALLA_P}`))
    )
  }
  updatePantalla(id: string, changes: Partial<Pantalla>){
    return this.http.put(`${this.url}/api/Pantalla/${id}`, changes, httpOptions);
  }
  deletePantalla(id: string){
    return this.http.delete(`${this.url}/api/Pantalla/${id}`, httpOptions)
  }
}
