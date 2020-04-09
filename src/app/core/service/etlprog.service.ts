import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ETLProg } from '../models/etlprog';
import { tap } from 'rxjs/operators';
import { GlobalVariable } from './../../shared/global'
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

   postETL(cron) {
    console.log('recibi expresion: ', cron);
    return this.http.post(`${this.url}/api/ETL/rescheduleContable`, cron, httpOptions).pipe(
      tap((etl: ETLProg) => console.log(`added product w/ id=${etl.ID_ETL_PROG}`))
    );
   }
}
