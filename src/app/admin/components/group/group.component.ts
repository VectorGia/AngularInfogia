import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { User } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/service/user.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { RelacionesService } from 'src/app/core/service/relaciones.service';
import { GrupoService } from 'src/app/core/service/grupo.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material';
import { Usuario } from 'src/app/core/models/usuario';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

const ELEMENT_DATA: User[] = []

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})

export class GroupComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'accion'];
  dataSource: any;
  model: any = [];
  groups: any;
  formGrupo: FormGroup;
  listaForm: FormGroup;
  grupos =[];
  relacion = [];
  id: string;
  grupoItem: string = '';
  constructor(protected us: UserService,
              private gs: GrupoService,
              private fb: FormBuilder,
              private usuari: UsuarioService,
              private rs: RelacionesService,
              public dialog: MatDialog)
              {
                
    this.listaForm = this.fb.group({
      INT_IDGRUPO_P: ['', Validators.required]
    });
   }
  ngOnInit() {
    this.fetchGrupo();
    this.formGrupo = this.fb.group({
      STR_NOMBRE_GRUPO: ['', Validators.required],
      BOOL_ESTATUS_LOGICO_GRUPO: [true]
    })
   
  }
  addGroup(form: NgForm){
    this.gs.addGrupo(form).subscribe(
      res =>{
        let STR_NOMBRE_GRUPO = res['STR_NOMBRE_GRUPO'];
        this.ngOnInit();
      }
    )
  }
  fetchGrupo(){
    this.gs.getAllGrupo()
    .subscribe(grupos => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = grupos;
        console.log("grupo1",grupos)
      });
   }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    /* this.array.filter = filterValue.trim().toLowerCase();
    if (this.array.paginator) {
      this.array.paginator.firstPage();
    } */
  } 

  delete(id){
    this.gs.deleteGrupo(id).subscribe(
      res=> {
        this.fetchGrupo();
      }
    )
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: "Esta seguro de eliminar este grupo?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.delete(id)
        // DO SOMETHING
      }
    });
  }
}
