import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/global';
import * as FileSaver from 'file-saver';
import {Observable} from 'rxjs';
import {Reporte} from '../models/reporte';
import {Parametros} from '../models/parametros';

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

   getAllReportes(): Observable<Reporte[]> {
    return this.http.get<Reporte[]>(`${this.url}/api/Reportes/reportes`);
   }

   getParametros(id): Observable<any> {
    return this.http.get<any>(`${this.url}/api/Reportes/parametros/${id}`);
   }
  public generarReporte(reportesRequest) {
    return this.http.post<any>(`${this.url}/api/Reportes/generar`, reportesRequest).subscribe(res =>{
      console.log("excel B64 ",res.resB64);
      this.downloadExcel(reportesRequest.nombreReporte+".xlsx",res.resB64);
    });
  }

  public exportProforma(detalleProforma) {
    return this.http.post<any>(`${this.url}/api/ProformaExcel/export`, detalleProforma).subscribe(res => {
      console.log('excel B64 ', res.resB64);
      this.downloadExcel('proforma.xlsx', res.resB64);
    });
  }
  public importExcel(fileList: FileList, callback): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (x) => {
      let urlB64 = fileReader.result.toString();
      let b64 = urlB64.substring(urlB64.indexOf('base64,')+7);
      console.log('enviando excel:', b64);
      self.http.post<any>(`${self.url}/api/ProformaExcel/import`, {b64Data:b64}).subscribe(callback);
    };
    fileReader.readAsDataURL(file);
  }
  downloadExcel(filename, contenidoB64) {
    let url = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + contenidoB64;
    FileSaver.saveAs(url, filename);
  }
}
