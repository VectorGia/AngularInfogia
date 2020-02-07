import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from './../../shared/global'
import { Observable } from 'rxjs';
import { ProformaDetalle } from '../models/proformadetalle';
import { Proforma } from '../models/proforma';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProformaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getTestProforma(proforma): Observable<Proforma>{
     console.log("recibi: ",proforma)
     return this.http.post<Proforma>(`${this.url}/api/Proforma`, proforma)
   }
}
