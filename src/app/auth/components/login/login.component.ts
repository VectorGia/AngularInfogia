import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { LoginServiceService } from 'src/app/core/service/login-service.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any={};
  errorMessage: string;
  TokenModel : any={'UserName':'','tokenResponse':''};
  tokenResponse:string;
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  constructor(private api: LoginServiceService,
              private router: Router,
              private aS: AuthService,
              private fB: FormBuilder,
              private uS: UsuarioService) {
   }

  ngOnInit() {
    this.loginForm = this.fB.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.aS.logout();
    sessionStorage.removeItem('UserName');
    sessionStorage.clear();
  }

  get f(){return this.loginForm.controls;}

  Login(form: NgForm){
    console.log(form)
    this.api.login(form).subscribe(
      data => {
        console.log(data.Status);
        if(data.message == true){
          
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('token', this.f.username.value);
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.errorMessage = "Usuario o contraseña incorrecta";
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  }
}
