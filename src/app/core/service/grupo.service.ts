import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo.model';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  model: any;
  constructor(private hc: HttpClient) { 
    
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllGrupo(): Observable<Grupo[]>{
    return this.hc.get<Grupo[]>(`${this.url}/api/Grupo`);
  }

  getGrupo(id){
    return this.hc.get<Grupo>(`${this.url}/api/Grupo/${id}`)

  }
  addGrupo(grupo): Observable<Grupo>{
    return this.hc.post<Grupo>(`${this.url}/api/Grupo`, grupo,httpOptions).pipe(
      tap((grupo: Grupo)=>console.log(`added product w/ id=${grupo.STR_NOMBRE_GRUPO}`))
    )
  }

  updateGrupo(id: string, changes: Partial<Grupo>){
    console.log(id)
    return this.hc.put(`${this.url}/api/Grupo/${id}`, changes, httpOptions)
  }

  deleteGrupo(id: string){
    return this.hc.delete(`${this.url}/api/Grupo/${id}`, httpOptions)
  }
}
