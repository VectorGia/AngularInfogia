import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import { Observable } from 'rxjs';
import { TipoCaptura } from '../models/tipocaptura';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TipocapturaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }
   getAllTipoCaptura(): Observable<TipoCaptura[]> {
    return this.http.get<TipoCaptura[]>(`${this.url}/api/TipoCaptura`);
   }
  }
