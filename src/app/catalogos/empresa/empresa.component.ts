import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { Compania } from 'src/app/core/models/compania';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  displayedColumns: string[] = ['idDB','id', 'empresa', 'abrev', 'etl','cadconexion','cambio', 'action'];
  mostrarDatos: boolean;
  compania: Compania[] = [];
  form: FormGroup;
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor( private fb: FormBuilder, private cs: CompaniaService, public dialog: MatDialog) {
    this.form = this.fb.group({
      desc_id: ['', Validators.required],
      nombre: ['', Validators.required],
      abrev: ['', Validators.required],
      activo_etl: [true],
      host: ['', Validators.required],
      puerto_compania: ['', Validators.required],
      usuario_etl: ['', Validators.required],
      contrasenia_etl: ['', Validators.required],
      bd_name: ['', Validators.required],
      moneda_id: ['', Validators.required],
      activo: [true, Validators.required],
      id_centro_costo: ['1', Validators.required]
    })


  }

  ngOnInit() {

    this.obtener();
  }

  obtener(){
    this.cs.getAllCompania()
    .subscribe(
      x => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = x;
        console.log("empresas: ", this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros!' + error);
      }
    )
  }
  delete(id){
    console.log(id)
    this.cs.deleteCompania(id).subscribe(
      (data) => {
        this.ngOnInit();
      }
    )
  }
  saveDatos(form: NgForm){
    this.cs.addCompania(form).subscribe(
      res => {
        let id = res['STR_IDCOMPANIA'];
        alert("Agregado correctamente");
        this.ngOnInit();
      }
    )
  }
  activar():void{
    this.mostrarDatos = true;
  }
  desactivar():void{
    this.mostrarDatos = false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  extraccion(id){

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



