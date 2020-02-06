import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCambio } from '../models/cambio';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class CambioService {
  private url = GlobalVariable.BASE_API_URL;
  path: string;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getAllCambios(): Observable<TipoCambio[]>{
    return this.http.get<TipoCambio[]>(`${this.url}/api/TipoCambio`)
   }
   postCambio(cambio): Observable<TipoCambio>{
    return this.http.post<TipoCambio>(`${this.url}/api/TipoCambio`, cambio, httpOptions).pipe(
      tap((cambio: TipoCambio) => console.log(`added product w/ id=${cambio.INT_IDMONEDA_P}`))
    )
   }
}
