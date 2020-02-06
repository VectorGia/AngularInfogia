import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  rootPath : string;
  header : any;

  constructor(private http: HttpClient) {
    this.rootPath = 'https://localhost:44354/api/Login'

      const headerSettings: {[name: string]: string | string[]; } = {};
      this.header = new HttpHeaders(headerSettings);

  }
  login(model : any){
    var a = this.rootPath;
    return this.http.post<any>(this.rootPath,model,{headers: this.header});
  }
}
