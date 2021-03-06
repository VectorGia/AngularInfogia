import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from './../../shared/global'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) { 
  
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllCuentas(): Observable<any[]>{
    return this.http.get<any>(`${this.url}/api/Cuentas`)
  }
}
