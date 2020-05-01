import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Negocio } from '../models/negocio';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) { 
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllModelos(): Observable<Negocio[]>{
    return this.http.get<Negocio[]>(`${this.url}/api/ModeloNegocio`);
  }

  getModelo(id: string){
    console.log(id)
    return this.http.get<Negocio>(`${this.url}/api/ModeloNegocio/${id}`)
  }
  addModelos(negocio): Observable<Negocio> {
    console.log("[enviar a back]: ", negocio);
    return this.http.post<Negocio>(`${this.url}/api/ModeloNegocio`,negocio, httpOptions).pipe(
      tap((negocio: Negocio) => console.log(`added negocio w/ id=${negocio.nombre}`))
    )
  }
/* 
  addModeloUnidad(negocio): Observable<Negocio> {
    console.log("[enviar a back]: ", negocio);
    negocio.unidad_negocio_id = negocio.unidad_negocio_id.toString();
    return this.http.post<Negocio>(`${this.url}/api/ModeloUnidad`, negocio, httpOptions);
  } */
  updateModelo(id: string, changes: Partial<Negocio>){
    return this.http.put(`${this.url}/api/ModeloNegocio/${id}`, changes, httpOptions);
  }
  deleteModelo(id: string){
    return this.http.delete(`${this.url}/api/ModeloNegocio/${id}`, httpOptions)
  }
}
