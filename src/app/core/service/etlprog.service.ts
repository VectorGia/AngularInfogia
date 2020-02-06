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

   postETL(etl): Observable<ETLProg>{
    return this.http.post<ETLProg>(`${this.url}/api/ETLProg`, etl, httpOptions).pipe(
      tap((etl: ETLProg) => console.log(`added product w/ id=${etl.ID_ETL_PROG}`))
    );
   }
}
