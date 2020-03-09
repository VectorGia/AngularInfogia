import { Component, OnInit } from '@angular/core';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { ExcelService } from 'src/app/core/service/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-buscarproforma',
  templateUrl: './buscarproforma.component.html',
  styleUrls: ['./buscarproforma.component.css']
})
export class BuscarproformaComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'fecha', 'action'];
  proforma: any;
  constructor(private proformaService: ProformaService, private exportService: ExcelService) { }

  ngOnInit() {
    this.fetchProforma();
  }

  fetchProforma() {
    this.proformaService.getAllProformas()
    .subscribe(res => {
      this.proforma = res;
      console.log('consultar: ', this.proforma);
    });
  }



}
