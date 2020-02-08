import { Component, OnInit } from '@angular/core';
import { MontosconsolidadosService } from 'src/app/core/service/montosconsolidados.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';

export interface Numeros {
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
}

const ELEMENT_DATA: Numeros[] = [
  {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0},
  {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0},
  {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0},
  {enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0}
]

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  displayedColumns: string[] = ['nombre','total','aant','ejercicio','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre'/* , 'apost' */];
  displayedColumn: string[] = ['aant','enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  dataSource: any;
  tresnueve: boolean = false;
  seisseis: boolean = false;
  nuevetres: boolean = false;
  condiciones: FormGroup;
  proforma: any;
  formProforma: FormGroup;
  change:any;

  empresas: any;
  centros: any;
  constructor(private montosServies: MontosconsolidadosService, 
    private fB: FormBuilder, 
    private proformaService: ProformaService,
    private empresaService: CompaniaService,
    private centroService: CentrosService) { 
    //this.getProforma();

  }

  ngOnInit() {
    this.buildProforma();
    this.fetchCentros();
    this.fetchEmpresa();
  }

  buildProforma(){
    this.formProforma = this.fB.group({
      anio: [2019],
      tipo_captura_id: [2],
      tipo_proforma_id: [''],
      empresa_id: [''],
      centro_costo_id: ['']
    })
  }

  onChange(value){
    console.log(value)
    if(value === "4"){
      this.tresnueve=true;
      this.seisseis = false;
      this.nuevetres = false;
    }
    if(value === "5"){
      this.tresnueve = false;
      this.seisseis = true;
      this.nuevetres = false;
    }
    if(value === "6"){
      this.tresnueve = false;
      this.seisseis = false;
      this.nuevetres = true;
    }
  }
 /*  getMontos(form: NgForm){
    return this.montosServies.getAllMontos(form)
    .subscribe(data => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
      console.log("Montos: ", this.dataSource.data)
    },
    error => {
      console.log('Error al extraer los registros!' + error);
    });
  } */

  save(form: NgForm){
    this.proformaService.getTestProforma(form).subscribe(res=>{
      this.proforma = res;
      console.log("Proforma: ",this.proforma)
    })
  }

  fetchEmpresa(){
    this.empresaService.getAllCompania()
    .subscribe(res => {
      this.empresas = res
    })
  }

  fetchCentros(){
    this.centroService.getAllCentros()
    .subscribe(res => {
      this.centros = res;
    })
  }
  /* getProforma(){
    this.proformaService.getTestProforma()
    .subscribe( res => {
      this.proforma =  res;
      console.log("Proforma: ", this.proforma)
    },
    error => {
      console.log('Error al extraer los registros!' + error);
    });
  } */

  guardarProforma(){
    if(this.isValidDetalles(this.proforma, ['nombre_rubro'])){
      this.proformaService.addProforma(this.proforma)
      .subscribe( res => {
        alert("Se guardo");
      })
    }
  }

  changeMonto(detalle: any, nombrecol, event: any){
    if(isNaN(event.target.value)){
      alert("Dato invalido, favor de verificar.");
      event.target.focus();
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    detalle[nombrecol] = event.target.value;
    console.log(detalle);

  }

  isValidDetalles(detalles,excludeProperties){
    for(var i=0;i<detalles.length;i++){
        for (const prop in detalles[i]) {
            if(excludeProperties.indexOf(prop)===-1){
                console.log(prop + ': ' + detalles[i][prop]);
                if(isNaN(detalles[i][prop])){
                    alert("existe algun dato no numérico en la proforma favor de validar.");
                    return false;
                }
            }
        }
    }
    return true;
}
}
