import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogReportComponent} from '../dialog-report/dialog-report.component';
import {ExcelService} from '../../core/service/excel.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
reportes = [];
id;
  constructor(public dialog: MatDialog,
              private excelService: ExcelService) { }

  ngOnInit() {
    this.fetchReportes();
  }

  generarRepo() {
    const reportesRequest1 = {idReporte: 1000000000000, nombreReporte: 'pruebas', parametros: {usuario: '0'}};
    this.excelService.generarReporte(reportesRequest1);
  }
  openDialog(id): void {
    const dialogRef = this.dialog.open(DialogReportComponent, {
      width: '500px',
      data: {
        id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  fetchReportes() {
      this.excelService.getAllReportes().
        subscribe(data => {
         this.reportes = data;
         console.log('Reporte: %o', this.reportes);
      });
  }

}
