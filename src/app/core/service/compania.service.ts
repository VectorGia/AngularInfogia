import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compania } from '../models/compania';
import { map, tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllCompania(): Observable<Compania[]> {
    return this.http.get<Compania[]>(`${this.url}/api/Empresa`);
  }

  getCompania(id: string) {
    return this.http.get<Compania>(`${this.url}/api/Empresa/${id}`);
  }

  addCompania(compania): Observable<Compania> {
    return this.http.post<Compania>(`${this.url}/api/Empresa`, compania, httpOptions).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap((compania: Compania) => console.log(`added compania w/ id=${compania.nombre}`))
    );
  }
  updateCompania(id: string, changes: Partial<Compania>) {
    return this.http.put(`${this.url}/api/Empresa/${id}`, changes, httpOptions);
  }

  deleteCompania(id: string) {
    return this.http.delete(`${this.url}/api/Empresa/${id}`, httpOptions);
  }
}
