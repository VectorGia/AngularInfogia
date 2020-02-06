import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Relaciones } from '../models/relaciones';
import { GlobalVariable } from './../../shared/global'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllRelaciones(): Observable<Relaciones[]>{
    return this.http.get<Relaciones[]>(`${this.url}/api/RelacionUsuario`)
  }

  getRelacion(id: string){
    return this.http.get<Relaciones>(`${this.url}/api/RelacionUsuario/${id}`)
  }
  postRelaciones(relacion): Observable<Relaciones>{
    console.log("recibi", relacion)
    return this.http.post<Relaciones>(`${this.url}/api/RelacionUsuario`, relacion, httpOptions)
  }
  putRelacion(id: string, changes: Partial<Relaciones>){
    return this.http.put(`${this.url}/api/Relaciones/${id}`, changes, httpOptions)
  }
}
