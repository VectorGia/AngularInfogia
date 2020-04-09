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
  displayedColumns: string[] = ['idDB', 'id', 'empresa', 'abrev', 'etl', 'cadconexion', 'cambio', 'action'];
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
        console.log('Error al extraer los registros!' + error);
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
    this.cs.addCompania(form).subscribe(
      res => {
        const id = res['STR_IDCOMPANIA'];
        Swal.fire(
          'Listo!',
          'Se guardo la empresa!',
          'success'
        );
        this.ngOnInit();
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
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: 'No podras deshacer este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.delete(id);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La empresa ha sido borrada.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La empresa no se elimino :)',
          'error'
        );
      }
    });
  }
}



