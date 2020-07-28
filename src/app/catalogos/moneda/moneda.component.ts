import { Component, OnInit, ViewChild } from '@angular/core';
import { Año } from 'src/app/core/models/año.model';
import { Mes } from 'src/app/core/models/mes.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { CambioService } from 'src/app/core/service/cambio.service';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.css']
})
export class MonedaComponent implements OnInit {
  displayedColumns = ['id', 'abrev', 'nombre', 'estatus', 'action'];
  displayedColumn = ['abrev', 'nombre', 'cambio', 'fecha', 'action'];
  formMoneda: FormGroup;
  form: FormGroup;
  dataSource: any;
  dataSourcee: any;
  monedas = [];
  constructor(private fB: FormBuilder, private mS: MonedaService, private tS: CambioService) {
    this.buildCambio();
    this.buildMoneda();
   }

  ngOnInit() {
    this.fetchMonedas();
    this.fetchCambios();
  }

  saveMoneda(form: NgForm){
    this.mS.postMoneda(form)
    .subscribe(res => {
      let id = res['STR_CLAVEDESC'];
      alert('Se guardo exitosamente')
      this.ngOnInit();
    })
    this.formMoneda.reset()
  }

  saveCambio(form: NgForm){
    console.log("cambio", form)
    this.tS.postCambio(form)
    .subscribe(res => {
      let id = res['INT_IDMONEDA_P'];
      alert('Tipo de cambio guardado')
    })
  }
  deleteMoneda(id){
    this.mS.deleteMoneda(id)
    .subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }
  fetchMonedas(){
    this.mS.getAllMonedas().subscribe(data =>{
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
      this.monedas = data;
      console.log(this.dataSource.data);
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  fetchCambios(){
    this.tS.getAllCambios().subscribe(data => {
      this.dataSourcee = new MatTableDataSource();
      this.dataSourcee.data = data;
      console.log("tipos", this.dataSourcee.data);
    },
    error => {
      console.log('Error al obtener los registros', error);
    });
  }
  buildMoneda(){
    this.formMoneda = this.fB.group({
      descripcion: ['', Validators.required],
      clave: ['', Validators.required],
      pais: ['', Validators.required],
      estatus: ['', Validators.required],
      activo: [true]
    })
  }
  buildCambio(){
    this.form = this.fB.group({
      DBL_TIPOCAMBIO_OFICIAL: ['',Validators.required],
      INT_IDMONEDA_P: ['',Validators.required],
      BOOL_ESTATUS_TIPOCAMBIO: [true]
    })
  }

}
