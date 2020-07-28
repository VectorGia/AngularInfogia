import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from './../../shared/global'
import { Observable } from 'rxjs';
import { Rubros } from '../models/rubro';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RubroService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getRubros(): Observable<Rubros[]> {
  return this.http.get<Rubros[]>(`${this.url}/api/Rubros/`);
  }

  getRubroByModeloId(id) {
    console.log('recibi id: ', id);
    return this.http.get<Rubros>(`${this.url}/api/Rubros/${id}`);
  }

  getRubroById(id) {
    console.log('recibi id: ', id);
    return this.http.get<Rubros>(`${this.url}/api/Rubros/id/${id}`);
  }

  postRubro(rubro): Observable<Rubros> {
    console.log(rubro);
    rubro.hijos = rubro.hijos.toString();
    return this.http.post<Rubros>(`${this.url}/api/Rubros`, rubro, httpOptions).pipe(
      tap((rubro: Rubros) => console.log(`added rubro w/ id=${rubro.id}`))
    );
  }

  updateRubro(id: any, changes: Partial<Rubros>) {
    console.log('recibi: ', id, changes);
    changes.hijos = changes.hijos.toString();
    return this.http.put(`${this.url}/api/Rubros/${id}`, changes, httpOptions);
  }

  deleteRubro(id: any) {
    return this.http.delete(`${this.url}/api/Rubros/${id}`, httpOptions);
  }
}
