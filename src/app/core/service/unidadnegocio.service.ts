import { Injectable } from '@angular/core';
import { GlobalVariable } from 'src/app/shared/global';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadNegocio } from '../models/unidadnegocio';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UnidadnegocioService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  getAllUnidades(): Observable<UnidadNegocio[]> {
    return this.http.get<UnidadNegocio[]>(`${this.url}/api/UnidadNegocio`);
  }

}
