import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import * as FileSaver from 'file-saver';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
};

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  model: any;
  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
   }

   exportProforma(detallesProfToRender) {
     console.log('detallesProfToRender to export: ', detallesProfToRender);
     return this.http.post<any>(`${this.url}/api/ProformaExcel/export`, detallesProfToRender);
     // window.open(`${this.url}/api/ProformaExcel/export`, '_blank')
   }
  imporProforma() {

  }
}
