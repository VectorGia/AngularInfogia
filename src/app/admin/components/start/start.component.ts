import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';
import { User } from 'src/app/core/models/users';
import { HttpClient, JsonpInterceptor, JsonpClientBackend } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/core/models/usuario';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { UsuarioADService } from 'src/app/core/service/usuario-ad.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  dataSource: any;
  usuario = [];
  
  model: any;

  constructor( protected us: UsuarioADService, private usuarioservice: UsuarioService) { }

  ngOnInit() {
    this.us.getAllUsuariosAD()
      .subscribe(use => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = use;
      //this.usuario = use;
      console.log("carga inicial", this.dataSource.data)
    })
   
  }


  addUser(){

    const obj = JSON.stringify(this.usuario);
    console.log("listo",this.dataSource.data);
    
        this.us.postUsuario(this.model).subscribe(
          res => {
            alert('Usuarios guardados correctamente')
          })
  }
}
