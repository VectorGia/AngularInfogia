import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moneda } from '../models/moneda';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) { 
    
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllMonedas(): Observable<Moneda[]>{
    return this.http.get<Moneda[]>(`${this.url}/api/Moneda`);
  }

  getMoneda(id: string){
    return this.http.get<Moneda>(`${this.url}/api/Moneda/${id}`)
  }

  postMoneda(moneda): Observable<Moneda>{
    return this.http.post<Moneda>(`${this.url}/api/Moneda`, moneda, httpOptions).pipe(
      tap((moneda: Moneda) => console.log(`added negocio w/ id=${moneda.STR_PAIS}`))
    )
  }

  updateMoneda(id: string, changes: Partial<Moneda>){
    return this.http.put(`${this.url}/api/Moneda/${id}`, changes, httpOptions);

  }

  deleteMoneda(id: string){
    return this.http.delete(`${this.url}/api/Moneda/${id}`, httpOptions)
  }
}
