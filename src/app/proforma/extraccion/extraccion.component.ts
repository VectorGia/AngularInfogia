import { Component, OnInit } from '@angular/core';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Compania } from 'src/app/core/models/compania';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EtlprogService } from 'src/app/core/service/etlprog.service';
import { PreproformaService } from 'src/app/core/service/preproforma.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-extraccion',
  templateUrl: './extraccion.component.html',
  styleUrls: ['./extraccion.component.css']
})
export class ExtraccionComponent implements OnInit {
  displayedColumns: string[] = ['idDB', 'id', 'empresa', 'abrev', 'etl', 'cadconexion', 'cambio'];
  dataSource: any;
  selection = new SelectionModel<Compania>(true, []);
  formFecha: FormGroup;
  constructor(private cS: CompaniaService,
              private fB: FormBuilder,
              private eS: EtlprogService,
              private pProformaService: PreproformaService,
              private spinner: NgxSpinnerService) {
    this.buildForm();
  }

  ngOnInit() {
    this.obtener();
  }
  obtener() {
    this.cS.getAllCompania()
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

  save(form: NgForm) {
    this.eS.postETL(form).subscribe(
      res => {
        let id = res['TEXT_FECH_EXTR'];
        alert('Progrmación lista');
    });
  }

  buildForm() {
    this.formFecha = this.fB.group({
      TEXT_FECH_EXTR: ['', Validators.required],
      TEXT_HORA_EXTR: ['', Validators.required]
    });
  }

  extraccion() {
    this.pProformaService.getPreProforma()
    .subscribe( res => {
      Swal.fire(
        'Listo!',
        'Se realizo la extracción!',
        'success'
      );
    });
  }
}
