import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ExcelService} from '../../core/service/excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.css']
})
export class DialogReportComponent implements OnInit {
formulario: FormGroup;
params: any;
  constructor(public dialogRef: MatDialogRef<DialogReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private excelService: ExcelService) {
    this.getParams();
  }

  ngOnInit() {
    this.buildForm();
    console.log('id:', this.data.id);
    console.log('nombre:', this.data.nombre);
  }

  buildForm() {
    this.formulario = this.fb.group({
      id: [this.data.id],
      parametro: ['']
    });
  }
  getParams() {
    this.excelService.getParametros(this.data.id)
      .subscribe( data => {
        this.params = data;
        console.log('Parametros: ', this.params);
      });
  }

  generateReport() {
    let paramsRequest = {};
    for (let i = 0; i < this.params.length; i++) {
      let parametro = this.params[i];
      if(parametro.requerido&&!parametro.valor){
        Swal.fire(
          'Error!',
          `Parametro ${parametro.clave} requerido`,
          'warning'
        );
        return;
      }
      paramsRequest[parametro.clave] = parametro.valor;
    }
    const request = {idReporte: this.data.id, nombreReporte: this.data.nombre, parametros: paramsRequest};

    this.excelService.generarReporte(request);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  changeValue(parametro,event: any){
    if (parametro.requerido&&!event.target.value) {
      Swal.fire(
        'Advertencia!',
        'Parametro requerido',
        'warning'
      );
      event.target.focus();
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    parametro['valor']=event.target.value;
  }
}
