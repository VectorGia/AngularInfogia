import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RelacionesCat } from '../models/relacionCat';
import { Observable } from 'rxjs';
import { GlobalVariable } from './../../shared/global'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class RelacionesCatalogoService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) { 
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllRelacionesCat(): Observable<RelacionesCat[]>{
    return this.http.get<RelacionesCat[]>(`${this.url}/api/RelacionCompania`)
  }

  getRelacionCat(id: string){
    return this.http.get<RelacionesCat>(`${this.url}/api/RelacionCompania/${id}`)
  }
  postRelacionesCat(relacion): Observable<RelacionesCat>{
    console.log("recibi", relacion)
    return this.http.post<RelacionesCat>(`${this.url}/api/RelacionCompania`, relacion, httpOptions)
  }
  putRelacionCat(id: string, changes: Partial<RelacionesCat>){
    return this.http.put(`${this.url}/api/RelacionCompania/${id}`, changes, httpOptions)
  }
}
