import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETLProg } from '../models/etlprog';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
import { DatosExtraccion } from '../models/extraccion';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class EtlprogService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getDatosExtraccion(): Observable<DatosExtraccion[]> {
      return this.http.get<DatosExtraccion[]>(`${this.url}/api/ETL/configCrons`);
   }
   extraccionManualCont(extraccion) {
     console.log('[recibi datos: ]', extraccion);
     return this.http.post(`${this.url}/api/ETL/contable`, extraccion, httpOptions);
   }
   postETLCont(cron) {
    console.log('recibi expresion: ', cron);
    return this.http.post(`${this.url}/api/ETL/rescheduleContable`, {valor: cron}, httpOptions);
   }

   postETLFlujo(cron) {
     console.log('recibi expresion cron: ',cron);
     return this.http.post(`${this.url}/api/ETL/rescheduleFlujo`, {valor: cron}, httpOptions);
   }

   extraccionManualflujo(extraccion): Observable<ETLProg> {
    console.log('[recibi datos: ]', extraccion);
    return this.http.post<ETLProg>(`${this.url}/api/ETL/flujo`, extraccion, httpOptions);
  }
  extraccionProgMontosCont(cron) {
    console.log('recibi expresion cron: ', cron);
    return this.http.post(`${this.url}/api/PreProforma/montosRescheduleContable`,  {valor: cron}, httpOptions);
  }
  extraccionProgMontosFlujo(cron) {
    console.log('recibi expresion cron: ', cron);
    return this.http.post(`${this.url}/api/PreProforma/montosRescheduleFlujo`,  {valor: cron}, httpOptions);
  }
}
