import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Periodo } from 'src/app/core/models/periodo.model';
import { Año } from 'src/app/core/models/año.model';

@Component({
  selector: 'app-estatus',
  templateUrl: './estatus.component.html',
  styleUrls: ['./estatus.component.css']
})
export class EstatusComponent implements OnInit {
  displayedColumns: string[] = ['tcp', 'tp', 'fech'];
  datos: Periodo[] = [
    { tcp:'Proforma Contable por Proyecto', tp: '0+12', fech:2019}
  ]
  fecha: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026,2027, 2028, 2029, 2030]
  data = new MatTableDataSource<Periodo>(this.datos);
  constructor() {  }

  ngOnInit() {
    
  }

}
