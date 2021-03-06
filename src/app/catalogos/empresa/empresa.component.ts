import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { Compania } from 'src/app/core/models/compania';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSort } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {
  displayedColumns: string[] = ['idDB', 'id', 'empresa', 'abrev', 'etl', 'cadconexion', 'bd_name' , 'cambio', 'action'];
  dataSource = new MatTableDataSource<Compania>();
  mostrarDatos: boolean;
  compania: Compania[] = [];
  form: FormGroup;

  @ViewChild(MatPaginator, {static: true}  ) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}  ) sort: MatSort;

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
    });


  }

  ngOnInit() {
    this.obtener();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtener() {
    this.cs.getAllCompania()
    .subscribe(
      x => {
        this.dataSource.data = x as Compania[];
        console.log('empresas: ', this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros' + error);
      });
  }
  delete(id) {
    console.log(id);
    this.cs.deleteCompania(id).subscribe(
      (data) => {
        this.ngOnInit();
      });
  }

  saveDatos(form: NgForm) {
    if (!this.form.valid) {
      Swal.fire(
        'Atención',
        'Complete la información requerida',
        'warning'
      );
      return false;
    }
    this.cs.addCompania(form).subscribe(
      res => {
        const id = res['STR_IDCOMPANIA'];
        Swal.fire(
          'Listo',
          'Se guardo la empresa',
          'success'
        );
        this.form.reset();
        Object.keys(this.form.controls).forEach(key => {
          this.form.get(key).setErrors(null) ;
        });
        this.ngOnInit();
      }, error => {
        Swal.fire(
          'Atención',
          'Ocurrió un error. Causa: ' + error['error'],
          'error'
        );
      });
  }
  activar(): void {
    this.mostrarDatos = true;
  }
  desactivar(): void {
    this.mostrarDatos = false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(id): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.delete(id);
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'La empresa ha sido borrada.',
          'success'
        );
      }});
  }
}



