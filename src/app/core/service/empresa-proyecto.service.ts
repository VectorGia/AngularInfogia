import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import { Observable } from 'rxjs';
import { EmpresaProyecto } from '../models/empresapro';
import { Compania } from '../models/compania';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpresaProyectoService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  constructor(private http: HttpClient) { 
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getEmpresas(id){
    console.log("recibi el id: ", id)
    return this.http.get<any>(`${this.url}/api/Empresa_Proyecto/${id}`)
  }
}
