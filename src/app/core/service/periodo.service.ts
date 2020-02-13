import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import { Observable } from 'rxjs';
import { Periodo } from '../models/periodo.model';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.url}/api/Periodo`);
  }

  postPeriodo(periodo): Observable<Periodo> {
    console.log('recibi periodo: ', periodo);
    return this.http.post<Periodo>(`${this.url}/api/Periodo`, periodo, httpOptions).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      tap(( periodo: Periodo) => console.log(`added periodos w/ id=${periodo.id}`)));
  }

  delete(id) {
    return this.http.delete(`${this.url}/api/Periodo/${id}`);
  }
}
