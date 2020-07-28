import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';
import { ProyectoService } from 'src/app/core/service/proyecto.service';
import { Proyecto } from 'src/app/core/models/proyecto';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';
import { RolService } from 'src/app/core/service/rol.service';
import { Relaciones } from 'src/app/core/models/relaciones';
import { RelacionesService } from 'src/app/core/service/relaciones.service';


@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})

export class RolComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'proyecto', 'empresa', 'cc', 'pantalla', 'ver', 'editar', 'borrar'];
  dataSource: any;
  formRol: FormGroup;
  constructor(private fB: FormBuilder,
    private rS: RolService,
    private rUS: RelacionesService) {
      this.fetchRoles();
     }

  ngOnInit() {
    this.formRol = this.fB.group({
      STR_NOMBRE_ROL: ['', Validators.required],
      BOOL_ESTATUS_LOGICO_ROL: [true]
    })
  }
  saveRol(form:NgForm){
    this.rS.postRol(form).subscribe(
      res=> {
        let id = res['STR_NOMBRE_ROL']
        alert("Creado exitosamente");

      }
    )
  }

  fetchRoles(){
    this.rUS.getAllRelaciones()
    .subscribe(
      data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        console.log(this.dataSource.data)
      },
      error => {
        console.log('Error al extraer los registros' + error);
      })
  }
}
