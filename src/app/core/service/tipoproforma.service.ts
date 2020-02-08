import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import { Observable } from 'rxjs';
import { Tipo_Proforma } from '../models/tipoproforma';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class TipoproformaService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getAllTipoProformas(): Observable<Tipo_Proforma[]>{
    return this.http.get<Tipo_Proforma[]>(`${this.url}/api/Proforma`)
  }
}
