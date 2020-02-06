import { Injectable } from '@angular/core';
import { GlobalVariable } from './../../shared/global'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Montos_Consolidados } from '../models/montosconsolidados';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MontosconsolidadosService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   getAllMontos(condiciones){
    return this.http.get<Montos_Consolidados>(`${this.url}/api/MontosConsolidados`, condiciones)
   } 
}
