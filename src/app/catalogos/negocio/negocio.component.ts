import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CuentasService } from 'src/app/core/service/cuentas.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  displayedColumns: string[] = ['nombre', 'action'];
  dataSource: any;
  cuentas: any;
  modeloForm: FormGroup;
  negocioForm: FormGroup;
  toppings = new FormControl();
  companias = [];
  select: boolean;
  nextClicked = false;
  constructor(private ns: NegocioService,
              private fb: FormBuilder,
              private cS: CompaniaService,
              private cuentaS: CuentasService,
              public dialog: MatDialog) {

                this.buildModelo();
  // this.fetchCuentas();
                this.fetchCompania();
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
        console.log('Error al extraer los registros!' + error);
      });
  }

  saveModelos(form: NgForm) {

    this.ns.addModelos(form).subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const nombre = res['nombre'];
        alert('Se guardo exitosamente!');
        this.ngOnInit();
      },
      error => {
        console.log('Ocurrio un error al extraer' + error);
      });
  }

  deleteCentro(id: string) {
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
