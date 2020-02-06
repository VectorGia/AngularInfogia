import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/service/usuario.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  modUserForm: FormGroup;
  id: string;
  hide = true;
  constructor(private fBuilder: FormBuilder,
                private activatedR: ActivatedRoute,
                private userS: UsuarioService,
                private router: Router) {
    this.buildEditForm();
   }

   return(){
    this.router.navigate(['./admin/user'])
   }
  ngOnInit() {
    this.activatedR.params.subscribe((params) => {
      this.id = params.id;
      this.userS.getUsuario(this.id)
      .subscribe(usuario => {
        this.modUserForm.patchValue(usuario)
      })
    })
  }

  buildEditForm(){
    this.modUserForm = this.fBuilder.group({
      stR_NOMBRE_USUARIO: ['', Validators.required],
      stR_USERNAME_USUARIO: ['', Validators.required],
      stR_PUESTO: ['', Validators.required],
      stR_EMAIL_USUARIO: ['', Validators.required],
      stR_PASSWORD_USUARIO: ['', Validators.required]

    })
  }

  saveUser(evet: Event){
    evet.preventDefault();
    if(this.modUserForm.valid){
      const user = this.modUserForm.value;
      this.userS.putUsuario(this.id, user)
      .subscribe((editUser) => {
        this.router.navigate(['./admin/user'])
      })
    }
  }
 
}
