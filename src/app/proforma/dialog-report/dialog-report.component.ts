import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {ExcelService} from '../../core/service/excel.service';

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
  }

  buildForm() {
    this.formulario = this.fb.group({
      id: [this.data.id],
      tipo: [''],
      nombre: [''],
      clave: [''],
    });
  }
  getParams() {
    this.excelService.getParametros(this.data.id)
      .subscribe( data => {
        this.params = data;
        console.log('Parametros: ', this.params);
      });
  }
  sendParams(form: NgForm) {
    this.excelService.addParametros(form)
      .subscribe(res => {
        console.log('Exito');
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
