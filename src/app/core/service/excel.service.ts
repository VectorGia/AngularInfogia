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

   getId(id) {
     console.log('recibi: ', id);
     window.open(`${this.url}/api/ProformaExcel/${id}`, '_blank');
     return id;
   }
}
