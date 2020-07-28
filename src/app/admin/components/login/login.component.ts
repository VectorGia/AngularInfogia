import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from 'src/app/core/models/usuario';
import { GrupoService } from 'src/app/core/service/grupo.service';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RolService } from 'src/app/core/service/rol.service';
import { PermisosService } from 'src/app/core/service/permisos.service';
import { PantallaService } from 'src/app/core/service/pantalla.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = true;
  displayedColumns: string[] = ['select','position','usuario'];
  usuario: any = [];
  grupo: any = [];
  rol: any =  [];
  permiso: any = [];
  pantalla: any = [];
  toppings = new FormControl();
  permisos = new FormControl();
  pantallas = new FormControl();
  usuarios = new FormControl();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selection = new SelectionModel<Usuario>(true, []);
  constructor(private uService: UsuarioService,
              private gService: GrupoService,
              private rService: RolService,
              private perService: PermisosService,
              private pantService: PantallaService,
              private _formBuilder: FormBuilder) {
    this.fetchUsuario();
    this.fetchGrupos();
    this.fetchRoles();
    this.fetchPermisos();
    this.fetchPantallas();
  }
  filteredOptions: Observable<Usuario[]>;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      user: ['', Validators.required],
      INT_IDGRUPO_P: ['',Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      INT_IDROL_P: ['', Validators.required]
    });
  }

  fetchRoles(){
    this.rService.getAllRoles()
    .subscribe(info => {
      this.rol = info;
      console.log(this.rol)
    })
  }

  fetchUsuario(){
    this.uService.getAllUsuarios()
    .subscribe( data => {
      this.usuario =  data;
      console.log("usuarios",this.usuario);
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  fetchGrupos(){
    this.gService.getAllGrupo()
    .subscribe(x => {
      this.grupo = x;
      console.log("grupo", this.grupo)
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  fetchPermisos(){
    this.perService.getAllPermisos()
    .subscribe(x => {
      this.permiso = x;
      console.log("permisos", this.permiso)
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  fetchPantallas(){
    this.pantService.getAllPantallas()
    .subscribe(x => {
      this.pantalla = x;
      console.log("pantallas", this.pantalla)
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  addUG(form: NgForm){

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.grupo.filter = filterValue;
    /* this.array.filter = filterValue.trim().toLowerCase();
    if (this.array.paginator) {
      this.array.paginator.firstPage();
    } */
  }

}
