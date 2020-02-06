import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalVariable } from './../../shared/global'
import { Observable } from 'rxjs';
import { ProformaDetalle } from '../models/proformadetalle';

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

   getTestProforma():Observable<ProformaDetalle[]>{
     return this.http.get<ProformaDetalle[]>(`${this.url}/api/TestProforma`)
   }
}
