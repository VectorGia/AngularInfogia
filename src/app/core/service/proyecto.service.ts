import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { GlobalVariable } from './../../shared/global'
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllProyecto(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.url}/api/Proyecto`)
  }

  getProyecto(id: string){
    return this.http.get<Proyecto>(`${this.url}/api/Proyecto/${id}`)
  }
  addProyecto(proyecto): Observable<Proyecto>{
    console.log("recibi",proyecto);
    proyecto.idsempresas = proyecto.idsempresas.toString();
    return this.http.post<Proyecto>(`${this.url}/api/Proyecto`, proyecto, httpOptions)
  }
  updateProyecto(id: string, changes: Partial<Proyecto>){
    return this.http.put(`${this.url}/api/Proyecto/${id}`,changes,httpOptions);
  } 

  deleteProyecto(id: string){
    return this.http.delete(`${this.url}/api/Proyecto/${id}`,httpOptions);
  }

}
