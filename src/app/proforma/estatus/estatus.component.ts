import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Periodo } from 'src/app/core/models/periodo.model';
import { Año } from 'src/app/core/models/año.model';
import { HttpClient } from '@angular/common/http';
import { PeriodoService } from 'src/app/core/service/periodo.service';
import { TipocapturaService } from 'src/app/core/service/tipocaptura.service';
import { TipoproformaService } from 'src/app/core/service/tipoproforma.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.css']
})
export class EstatusComponent implements OnInit {
  displayedColumns: string[] = ['activo', 'tcp', 'tp', 'fech', 'actions'];
  fecha: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  periodos: any;
  tcaptura: any;
  proformar: any;
  periodoForm: FormGroup;
  estatus: any;
  constructor(private periodoService: PeriodoService, private capturaService: TipocapturaService,
              private proformarService: TipoproformaService, private formBuilder: FormBuilder, public dialog: MatDialog) {
                this.buildFormPeriodo();
                }

  ngOnInit() {
    this.fetchTipoCaptura();
    this.fetchPeriodos();
    this.fetchTipoProformar();
  }

  buildFormPeriodo() {
    this.periodoForm = this.formBuilder.group({
      tipo_captura_id: ['', Validators.required],
      tipo_proforma_id: ['', Validators.required],
      anio_periodo: ['', Validators.required],
      activo: [true],
      estatus: [true]
    });
  }
  fetchPeriodos() {
    this.periodoService.getAllPeriodos()
    .subscribe( res => {
      this.periodos = res;
      console.log('Periodos: ', this.periodos);
    });
  }
  fetchTipoCaptura() {
    this.capturaService.getAllTipoCaptura()
    .subscribe( res => {
      this.tcaptura = res;
      console.log('Tipos captura: ', this.tcaptura);
    });
  }
  fetchTipoProformar() {
    this.proformarService.getAllTipoProformas()
    .subscribe( res => {
      this.proformar = res;
      console.log('Tipo Proformar: ', this.proformar);
    });
  }

  save(form: NgForm) {
    this.periodoService.postPeriodo(form)
    .subscribe(res => {
      alert('Se guardo con exito!');
      this.ngOnInit();
    });
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: 'Esta seguro de eliminar este grupo?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
        this.delete(id);
        // DO SOMETHING
      }
    });
  }
  delete(id){
    this.periodoService.delete(id).subscribe(
      (res) => {
       this.ngOnInit();
      }
    );
  }

  onChange(value: MatSlideToggleChange) {
    const { checked } = value;
    this.checked = checked;
  }
}
