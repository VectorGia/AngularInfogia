import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CuentasService } from 'src/app/core/service/cuentas.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UnidadnegocioService } from 'src/app/core/service/unidadnegocio.service';
import Swal from 'sweetalert2';

export interface Model {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.component.html',
  styleUrls: ['./negocio.component.css']
})

export class NegocioComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'action'];
  dataSource: any;
  cuentas: any;
  modeloForm: FormGroup;
  negocioForm: FormGroup;
  toppings = new FormControl();
  companias = [];
  unidades: any;
  select: boolean;
  nextClicked = false;
  validNombre: any;
  constructor(private ns: NegocioService,
              private fb: FormBuilder,
              private cS: CompaniaService,
              private cuentaS: CuentasService,
              private unidadService: UnidadnegocioService,
              public dialog: MatDialog) {

                this.buildModelo();
  // this.fetchCuentas();
                this.fetchCompania();
                this.fetchUnidad();
  }

  ngOnInit() {
    this.getModelos();
  }

  getModelos() {
    this.ns.getAllModelos()
    .subscribe(
      x => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = x;
        console.log(this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros' + error);
      });
  }

  saveModelos(form: NgForm) {
    console.log('[Datos a guardar]: ', form);
    // valido que el formulario este completo
    if (!this.negocioForm.valid) {
      Swal.fire(
        'Atención',
        'Complete la información requerida',
        'warning'
      );
      return false;
    }
    // itero para ver si existe empresa negocio con mismo nombre
    for ( const negocio of this.dataSource.data) {
      // parseo a mayusculas para comprobar si existe
      if (negocio.nombre.toUpperCase() === this.validNombre.toUpperCase()) {
        Swal.fire(
          'Atención',
          'Ya se encuentra un negocio con el mismo nombre',
          'warning'
        );
        return false;
      }
    }

    this.ns.addModelos(form).subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const nombre = res['nombre'];
        Swal.fire(
          'Listo',
          'Se guardo el modelo',
          'success'
        );
        this.ngOnInit();
      },
      error => {
        Swal.fire(
          'Error',
          'Ocurrió un error al guardar, intente de nuevo.',
          'error'
        );
      });
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
      title: '¿Estás seguro de eliminar el modelo?',
      text: 'No podrás deshacer este cambio y se eliminará el modelo contable y de flujo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.deleteModelo(id);
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El modelo se ha borrado.',
          'success'
        );
      }
    });
    /*const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: 'Estás seguro de eliminar este grupo?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.delete(id);
        // DO SOMETHING
      }
    });*/
  }
  deleteModelo(id: string) {
    this.ns.deleteModelo(id).subscribe(
      res => {
        this.ngOnInit();
      });
  }

  fetchCompania() {
    this.cS.getAllCompania()
    .subscribe(comp => {
      this.companias = comp;
      console.log('empresas: ', this.companias);
    });
  }

  fetchUnidad() {
    this.unidadService.getAllUnidades()
    .subscribe(uni => {
      this.unidades = uni;
      console.log('Unodades de Negocio: ', uni);
    });
  }
/*   fetchCuentas(){
    this.cuentaS.getAllCuentas()
    .subscribe(x => {
      this.cuentas = x;
      console.log(this.cuentas)
    })
  } */

  buildModelo() {
    this.negocioForm = this.fb.group({
      nombre: ['', Validators.required],
      unidades_negocio_ids: ['', Validators.required],
      activo: [true]
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

  opcr() {
    this.select = false;
  }
  opc() {
    this.select = true;
  }
}
