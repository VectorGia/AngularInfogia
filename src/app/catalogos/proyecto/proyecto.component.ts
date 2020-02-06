import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { Proyecto } from 'src/app/core/models/proyecto';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ProyectoService } from 'src/app/core/service/proyecto.service';

import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material';
import { NegocioService } from 'src/app/core/service/negocio.service';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'id', 'name', 'responsable', 'empresa', 'action'];
  dataSource: any;
  proyectoForm: FormGroup;
  companias: any;
  modelos: any;
  constructor(private ps: ProyectoService, private fb: FormBuilder, public dialog: MatDialog,
    private cS: CompaniaService, private modeloService: NegocioService){
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      responsable: ['', Validators.required],
      desc_id: ['', Validators.required],
      estatus: ['', Validators.required],
      activo: [true, Validators.required],
      modelo_negocio_id: ['', Validators.required],
      idsempresas: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.getProjects();
    this.fetchCompania();
    this.fetchModelos();
  }

  getProjects(){
    this.ps.getAllProyecto()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    },
    error => {
      console.log('Error al obtener los registros!', error)
    });
  }
  delete(id){
    this.ps.deleteProyecto(id).subscribe(
      (data) => {
        this.ngOnInit();
      }
    )
  }
  saveProyecto(form: NgForm){
    this.ps.addProyecto(form).subscribe(
      res => {
        let id = res['nombre'];
        this.ngOnInit();
      })
  }
  fetchCompania(){
    this.cS.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      console.log("compañias",this.companias)
    })
  }

  fetchModelos(){
    this.modeloService.getAllModelos()
    .subscribe( res => {
      this.modelos = res;
      console.log("modelos: ", this.modelos);
    })
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
