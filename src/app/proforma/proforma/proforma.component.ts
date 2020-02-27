import { Component, OnInit, ViewChild } from '@angular/core';
import { MontosconsolidadosService } from 'src/app/core/service/montosconsolidados.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';

export interface Numeros {
  nombre?: string;
  total?: number;
  aniosant?: number;
  ejercicio?: number;
  enero?: number;
  febrero?: number;
  marzo?: number;
  abril?: number;
  mayo?: number;
  junio?: number;
  julio?: number;
  agosto?: number;
  septiembre?: number;
  octubre?: number;
  noviembre?: number;
  diciembre?: number;
  hijo?: any;
  aritmetica?: any;
}

const ELEMENT_DATA: Numeros[] = [
  {nombre: 'Total Ingreso', total: 100, aniosant: 50, ejercicio: 50, enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
  julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0, hijo: 1},
  {nombre: 'Ingreso', total: 100, aniosant: 50, ejercicio: 50, enero: 100, febrero: 200, marzo: 300, abril: 400, mayo: 500, junio: 600,
  julio: 700, agosto: 800, septiembre: 900, octubre: 1000, noviembre: 1100, diciembre: 1200},
  {nombre: 'Total Egreso', total: 100, aniosant: 50, ejercicio: 50, enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0,
  agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0, hijo: 2},
  {nombre: 'Egreso', total: 100, aniosant: 50, ejercicio: 50, enero: 100, febrero: 200, marzo: 300, abril: 400, mayo: 500, junio: 600,
  julio: 700, agosto: 800, septiembre: 900, octubre: 1000, noviembre: 1100, diciembre: 1200},
  {nombre: 'Utilidad', total: 100, aniosant: 50, ejercicio: 50, enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0, julio: 0,
  agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0, aritmetica: 'ing + egr'}
];
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private montosServies: MontosconsolidadosService,
              private fB: FormBuilder, private proformaService: ProformaService,
              private empresaService: CompaniaService, private centroService: CentrosService) {
    // this.getProforma();

  }
  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['nombre', 'total', 'aant', 'ejercicio', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  displayedColumn: string[] = ['aant', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  dataSource = ELEMENT_DATA;
  tresnueve = false;
  seisseis = false;
  nuevetres = false;
  cero = false;
  doce = false;
  condiciones: FormGroup;
  proforma: any;
  formProforma: FormGroup;
  change: any;
  empresas: any;
  centros: any;

// var detalle={'total':300,'acumulado':200,'ejercicio':100,'enero':10,'febrero':10,'marzo':10,'abril':10,'mayo':60}
// var detalle1={'total':3000,'acumulado':2000,'ejercicio':1000,'enero':100,'febrero':100,'marzo':100,'abril':100,'mayo':600}

/* ponderacionCampos = { 'total': -1, 'aniosant ': -1,'ejercicio': -1,'enero': 1,
                      'febrero': 1, 'marzo': 3,'abril': 4,'mayo': 5,
                     'junio': 6, 'julio': 7, 'agosto': 8, 'septiembre': 9,
                     'octubre': 10, 'noviembre': 11, 'diciembre': 12}; */

 ponderacionCampos = { 'total_resultado': -1, 'anios_posteriores_resultado ': -1,'ejercicio_resultado': -1,'enero_monto_resultado': 1,
                     'febrero_monto_resultado': 1, 'marzo_monto_resultado': 3,'abril_monto_resultado': 4,'mayo_monto_resultado': 5,
                    'junio_monto_resultado': 6, 'julio_monto_resultado': 7, 'agosto_monto_resultado': 8, 'septiembre_monto_resultado': 9, 
                    'octubre_monto_resultado': 10, 'noviembre_monto_resultado': 11, 'diciembre_monto_resultado': 12};

  ngOnInit() {
    this.buildProforma();
    this.fetchCentros();
    this.fetchEmpresa();
  }

  buildProforma() {
    this.formProforma = this.fB.group({
      anio: [2019],
      tipo_captura_id: [''],
      tipo_proforma_id: [''],
      empresa_id: [''],
      centro_costo_id: ['']
    });
  }

  onChange(value) {
    console.log(value);
    switch (value) {
      case '4':
      this.tresnueve = true;
      this.seisseis = false;
      this.nuevetres = false;
      this.doce = false;
      break;
      case '5':
        this.tresnueve = false;
        this.seisseis = true;
        this.nuevetres = false;
        this.doce = false;
        break;
      case '6':
        this.tresnueve = false;
        this.seisseis = false;
        this.nuevetres = true;
        this.doce = false;
        break;
      case '2':
        this.tresnueve = false;
        this.seisseis = false;
        this.nuevetres = false;
        this.doce = true;
        break;
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

  save(form: NgForm) {
    this.proformaService.getTestProforma(form).subscribe(res => {
      this.proforma = this.splitDetalles(res, 6);
      console.log('Proforma: ', this.proforma);
    });
  }

  fetchEmpresa() {
    this.empresaService.getAllCompania()
    .subscribe(res => {
      this.empresas = res;
    });
  }

  fetchCentros() {
    this.centroService.getAllCentros()
    .subscribe(res => {
      this.centros = res;
    });
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

  guardarProforma() {
    if (this.isValidDetalles(this.proforma, ['nombre_rubro', 'fecha_captura', 'clave_rubro', 'aritmetica'])) {
      this.proformaService.addProforma(this.proforma)
      .subscribe( res => {
        alert('Se guardo');
      });
    }
  }

  changeMonto(detalle: any, nombrecol, event: any, table: any) {
    if (isNaN(event.target.value)) {
      alert('Dato invalido, favor de verificar.');
      event.target.focus();
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    /// HNA:dado que en las vista se divide entre 1000, aqui los montos ingresados se multiplicaran por 1000
    detalle[nombrecol] = event.target.value * 1000;
    // HNA: ocurrio un cambio correcto en la proforma por lo que se recalcula el detalle impactado y los totales de proforma
    // verificar que en pantala se ven los cambios si no es asi hay que repintar toda la proforma
    this.recalculateDetalle(detalle, this.proforma);
    // table.renderRows();
    console.log(detalle);

  }

  isValidDetalles(detalles, excludeProperties) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < detalles.length; i++) {
        for (const prop in detalles[i]) {
            if (excludeProperties.indexOf(prop) === -1) {
                console.log(prop + ': ' + detalles[i][prop]);
                if (isNaN(detalles[i][prop])) {
                    alert('existe algun dato no numérico en la proforma favor de validar.');
                    return false;
                }
            }
        }
    }
    return true;
}

sumColumns(detalles, targetColumn, columnsNames) {
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < detalles.length; i++) {
    this.sumColumnsForDetalle(detalles[i], targetColumn, columnsNames);
  }
  return detalles;
}

 sumColumnsForDetalle(detalle, targetColumn, columnsNames) {
  let suma = 0;
  // tslint:disable-next-line: prefer-for-of
  for (let j = 0; j < columnsNames.length; j++) {
    const colName = columnsNames[j];
    suma += detalle[colName];
  }
  detalle[targetColumn] = suma;

  return detalle;
}

getDetallesTotales(detalles) {
  const detallesTotales = [];
  detalles.forEach(detalle => {
    if (detalle.aritmetica) {
      detallesTotales.push(detalle);
    }
  });
  return detallesTotales;
}
recalculateDetalle(detalleModificado, detalles) {
  this.sumColumnsForDetalle(detalleModificado, 'ejercicio_resultado', [ 'enero_monto_resultado',
    'febrero_monto_resultado', 'marzo_monto_resultado', 'abril_monto_resultado',
    'mayo_monto_resultado', 'junio_monto_resultado', 'julio_monto_resultado', 'agosto_monto_resultado',
    'septiembre_monto_resultado', 'octubre_monto_resultado', 'noviembre_monto_resultado', 'diciembre_monto_resultado']);
  this.sumColumnsForDetalle(detalleModificado, 'total_resultado', ['ejercicio_resultado', 'acumulado_resultado']);
  this.calculaDetTot(detalles, this.getDetallesTotales(detalles));
  return detalles;
}

recalculateAll(detalles) {

  this.sumColumns(detalles, 'ejercicio_resultado', ['enero_monto_resultado',
    'febrero_monto_resultado', 'marzo_monto_resultado', 'abril_monto_resultado',
    'mayo_monto_resultado', 'junio_monto_resultado', 'julio_monto_resultado', 'agosto_monto_resultado',
    'septiembre_monto_resultado', 'octubre_monto_resultado', 'noviembre_monto_resultado', 'diciembre_monto_resultado']);
  this.sumColumns(detalles, 'total_resultado', ['ejercicio_resultado', 'acumulado_resultado'
  ]);
  this.calculaDetTot(detalles, this.getDetallesTotales(detalles));
  return detalles;
}
 calculaDetTot(detalles, detallesTotales) {
  console.log('##### detalles=%o, detallesTotales=%o', detalles, detallesTotales);
  detallesTotales.forEach(detalleTotal => {
    const aritmeticas = {};
    // tslint:disable-next-line: no-string-literal
    aritmeticas['enero_monto'] = detalleTotal.aritmetica;
    aritmeticas['febrero_monto'] = detalleTotal.aritmetica;
    aritmeticas['marzo_monto'] = detalleTotal.aritmetica;
    aritmeticas['abril_monto'] = detalleTotal.aritmetica;
    aritmeticas['mayo_monto'] = detalleTotal.aritmetica;
    aritmeticas['junio_monto'] = detalleTotal.aritmetica;
    aritmeticas['julio_monto'] = detalleTotal.aritmetica;
    aritmeticas['agosto_monto'] = detalleTotal.aritmetica;
    aritmeticas['septiembre_monto'] = detalleTotal.aritmetica;
    aritmeticas['octubre_monto'] = detalleTotal.aritmetica;
    aritmeticas['noviembre_monto'] = detalleTotal.aritmetica;
    aritmeticas['diciembre_monto'] = detalleTotal.aritmetica;
    aritmeticas['ejercicio'] = detalleTotal.aritmetica;
    aritmeticas['acumulado'] = detalleTotal.aritmetica;
    aritmeticas['total'] = detalleTotal.aritmetica;
    detalles.forEach(detalle => {
      const detalleClave = detalle.clave_rubro;
      if (detalleTotal.aritmetica.indexOf(detalleClave) !== -1) {
        // tslint:disable-next-line: forin
        for (const prop in aritmeticas) {
          aritmeticas[prop] = aritmeticas[prop].replace(detalleClave, '(' + detalle[prop + '_resultado'] + ')');
        }
      }

    });
    // tslint:disable-next-line: forin
    for (const prop in aritmeticas) {
      // console.log(prop+"_resultado="+aritmeticas[prop]);
      try {
        // tslint:disable-next-line: no-eval
        detalleTotal[prop + '_resultado'] = eval(aritmeticas[prop]);
      } catch (e) {
        console.error('Error de evaluacion de la expresion', e);
      }
    }
  });


  return detallesTotales;
}



splitDetalles(dataSource, mesinicio) {
  console.log('data: ', dataSource);
  const alldetalles = [];
  for (const detalle of dataSource) {
    if (!detalle.hijos && !detalle.aritmetica) {
      const detallesSplit = this.splitDetalle(detalle, mesinicio);
      for (const det of detallesSplit) {
        alldetalles.push(det);
        det.estilo = 'hijo';
      }
    } else {
      alldetalles.push(detalle);
      detalle.estilo = 'padre';
    }
  }
  console.log('devuelve: ', alldetalles);
  const reorder = this.reorderRubros(alldetalles);
  console.log('despues: ', reorder);
  return alldetalles;
}

splitDetalle(detalle, mesinicio) {

   const detReal = Object.assign({}, detalle);
   const detprof = Object.assign({}, detalle);
   for (const prop in this.ponderacionCampos) {
    if (this.ponderacionCampos[prop] > mesinicio) {
      detReal[prop] = 0;
      detReal.tipo = 'real';
     // proformados
    } else {
      detprof[prop] = 0;
      detprof.tipo = 'proform';
      // reales
    }
  }
   return [detReal, detprof];

}

reorderRubros(rubros) {
  console.log('recibi rubros: ', rubros);
  const rubrosReorder = [];
  const padres = this.getPadres(rubros);
  const padresSinHijos = [];
  //const padres = this.getPadres(rubros);
  for (const order of rubros) {
    if (!order.hijos) {
      padresSinHijos.push(order);
      continue;
    }
    rubrosReorder.push(order);
    const hijos = this.getHijos(rubros, order)
    for (const hijo of hijos) {
      rubrosReorder.push(hijo);
    }

  }
  for (const padreSinHijos of padresSinHijos) {
    rubrosReorder.push(padreSinHijos);
  }

  console.log('reorden:', rubrosReorder);
  return rubrosReorder;
}
getPadres(rubros) {
  const padres = [];
  for (let i = 0; i < rubros.length; i++ ) {
    const actual = rubros[i];
    if (actual.hijos || actual.aritmetica) {
      padres.push(actual);
    }
  }
  return padres;
}
// splitDetalles([detalle,detalle1], 3);
getHijos(padre, rubros) {
  const hijos = [];
  if (padre.hijos) {
    const arrhijos = padre.hijos.split(',');
    for (var i=0;i<arrhijos.length;i++) {
      const found = this.findById(rubros, arrhijos[i].trim());
      if (found) {
        hijos.push(found);
      }
    }
  }
  return hijos;
}

 findById(rubros, id) {
  for(let i=0;i<rubros.length;i++) {
    const actual = rubros[i];
    if (actual.id == id) {
      return actual;
    }
  }
  return null;
}
}
