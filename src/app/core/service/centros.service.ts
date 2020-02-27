import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from './../../shared/global';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CentroCostos } from '../models/centro.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  model: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getAllCentros(): Observable<CentroCostos[]> {
     return this.http.get<CentroCostos[]>(`${this.url}/api/Centro`);
   }

   getCentro(id: string) {
    return this.http.get<CentroCostos>(`${this.url}/api/Centro/${id}`);
   }
   getCC(id) {
     return this.http.get<CentroCostos>(`${this.url}/api/CC/${id}`);
   }
    addCentro(centro): Observable<CentroCostos> {
      console.log('mande: ', centro);
      return this.http.post<CentroCostos>(`${this.url}/api/Centro`, centro, httpOptions).pipe(
        // tslint:disable-next-line: no-shadowed-variable
        tap(( centro: CentroCostos) => console.log(`added product w/ id=${centro.nombre}`))
      );
    }

    updateCentro(id: string, changes: Partial<CentroCostos>) {
      return this.http.put(`${this.url}/api/Centro/${id}`, changes, httpOptions).pipe(
        tap(_ => console.log(`updated product id=${id}`))
      );
    }

    deleteCentro(id: any) {
      return this.http.delete(`${this.url}/api/Centro/${id}`, httpOptions).pipe(
        tap(_ => console.log(`delete product id=${id}`))
      );
    }
}
