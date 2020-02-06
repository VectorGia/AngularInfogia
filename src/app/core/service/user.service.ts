import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/users';
import { Usuario } from '../models/usuario';
import { GlobalVariable } from './../../shared/global'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = GlobalVariable.BASE_API_URL;
  header: any;
  private isUserLoggedIn;
  public usserLogged: Usuario;

  constructor(private http: HttpClient) {
    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
    this.isUserLoggedIn = false;
   }
  
   setUserLoggedIn(user:Usuario){
     this.isUserLoggedIn = true;
     this.usserLogged = user;
     localStorage.setItem('currentUser', JSON.stringify(user));
   }

   getUserLoggedIn(){
     return JSON.parse(localStorage.getItem('currentUser'));
   }

}
