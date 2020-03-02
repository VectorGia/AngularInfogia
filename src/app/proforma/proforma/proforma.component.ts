

import { Component, OnInit, ViewChild } from '@angular/core';
import { MontosconsolidadosService } from 'src/app/core/service/montosconsolidados.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';
import { ActivatedRoute } from '@angular/router';
import { TipoproformaService } from 'src/app/core/service/tipoproforma.service';
import { TipocapturaService } from 'src/app/core/service/tipocaptura.service';


@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  constructor(private montosServies: MontosconsolidadosService,
              private fB: FormBuilder, private proformaService: ProformaService,
              private empresaService: CompaniaService, private centroService: CentrosService,
              private activeRoute: ActivatedRoute,
    // this.getProforma();
              private tipoproformaService: TipoproformaService,
              private tipocapturaService: TipocapturaService) {
  }

  displayedColumns: string[] = ['nombre', 'total', 'aant', 'ejercicio', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  tresnueve = false;
  seisseis = false;
  nuevetres = false;
  doce = false;
  detallesProfToRender: any;
  detallesProforma: any;
  detallesProformaIdxIdRubro: any;
  detallesProformaIdxIdInterno: any;
  mesInicio: any;
  ajustes: any;
  tiposCambio = [];
  aniosProforma: any;
  conAjusteSinAjuste = [{etiqueta:'Sin ajuste',valor:false},{etiqueta:'Con ajuste',valor:true}];
  ajustarPorDefecto=false;
  formProforma: FormGroup;
  empresas: any;
  proforma: any;
  centros: any;
  id: any;
  tiposProforma:any;
  tiposCaptura:any;
  ponderacionCampos = {
    'total_resultado': -1, 'anios_posteriores_resultado ': -1, 'ejercicio_resultado': -1, 'enero_monto_resultado': 1,
    'febrero_monto_resultado': 1, 'marzo_monto_resultado': 3, 'abril_monto_resultado': 4, 'mayo_monto_resultado': 5,
    'junio_monto_resultado': 6, 'julio_monto_resultado': 7, 'agosto_monto_resultado': 8, 'septiembre_monto_resultado': 9,
    'octubre_monto_resultado': 10, 'noviembre_monto_resultado': 11, 'diciembre_monto_resultado': 12
  };
  esProformaContable = false;

  ngOnInit() {
    this.builForm();
    this.fetchCentros();
    this.fetchEmpresa();
    this.getAnios();
    this.tipoproformaService.getAllTipoProformas().subscribe(res => {this.tiposProforma = res; });
    this.tipocapturaService.getAllTipoCaptura().subscribe(res => {this.tiposCaptura = res; });
    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      this.proformaService.getProformaby(this.id)
      .subscribe(res => {
        this.proforma = res;
        console.log('proforma obtenida: ', this.proforma);
      });
    });
  }
builForm(){
  this.formProforma = this.fB.group({
    anio: [''],
    tipo_proforma_id: [''],
    tipo_captura_id: [''],
    empresa_id: [''],
    centro_costo_id: ['']
  });
}

getAnios() {
  this.proformaService.getAnios()
  .subscribe(res => {
    this.aniosProforma = res;
  });
}
  onChangeTipoCaptura(value) {
    this.esProformaContable = (value == 1);
  }
  onChangeTipoProforma(value) {
    console.log(value);
    switch (value) {
      case 4:
        this.tresnueve = true;
        this.seisseis = false;
        this.nuevetres = false;
        this.doce = false;
        break;
      case 5:
        this.tresnueve = false;
        this.seisseis = true;
        this.nuevetres = false;
        this.doce = false;
        break;
      case 6:
        this.tresnueve = false;
        this.seisseis = false;
        this.nuevetres = true;
        this.doce = false;
        break;
      case 2:
        this.tresnueve = false;
        this.seisseis = false;
        this.nuevetres = false;
        this.doce = true;
        break;
    }
  }


  render(form: NgForm) {
    this.proformaService.getProforma(form).subscribe(res => {

      this.detallesProforma = res;
      console.log('PROFORMA DETALLE: ', this.detallesProforma);
      this.detallesProformaIdxIdInterno = {};
      this.detallesProformaIdxIdRubro = {};
      // indexamos los detalles originales para acceder a ellos mediante el id interno(uid o id) y otro indice por rubro id
      for (const detalle of this.detallesProforma) {
        this.detallesProformaIdxIdInterno[detalle.idInterno] = detalle;
        this.detallesProformaIdxIdRubro[detalle.rubro_id] = detalle;
      }
      if (this.detallesProforma.length > 0) {
        this.mesInicio = this.detallesProforma[0].mes_inicio;
        this.detallesProfToRender = this.splitDetalles(this.detallesProforma, this.mesInicio);
      }
      console.log('Proforma: ', this.detallesProfToRender);
    });
    this.proformaService.getAjustes(form).subscribe(res => {
      this.ajustes = res;
      console.log('getAjustess %o', res);
    });
    this.proformaService.getTiposCambio(form).subscribe(res => {
      const respuesta = res;

      for (const key in respuesta) {
          this.tiposCambio.push({etiqueta: key, valor: respuesta[key]});
      }
      console.log('getTiposCambioo %o', this.tiposCambio);
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

  guardarProforma() {
    if (this.isValidDetalles(this.detallesProfToRender, ['nombre_rubro', 'fecha_captura', 'clave_rubro', 'aritmetica'])) {
      this.proformaService.addProforma(this.detallesProfToRender)
        .subscribe(res => {
          alert('Se guardo');
        });
    }
  }
/*a cada detalle de la proforma calculada, se le aplica un factor correspondiente al tipo de cambio */
  recalculaPorTipoCambio(factor) {
    let detalles = this.detallesProforma;
    for (let i = 0; i < detalles.length; i++) {
      let detActual = detalles[i];
      for (const prop in detActual) {
        let valor = detActual[prop];
        if (!isNaN(valor)) {
          detActual[prop] = valor * factor;
        }
      }
    }
  }

  recalculaPorAjusteBalanza(aplicar) {
    this.ajustes.forEach(ajuste => {
      let detalleProforma = this.detallesProformaIdxIdRubro[ajuste.rubro_id];
      for (const prop in detalleProforma) {
        let valor = detalleProforma[prop];
        if (!isNaN(valor)) {
          if (aplicar) {
            detalleProforma[prop] = valor + ajuste[prop];
          } else {
            detalleProforma[prop] = valor - ajuste[prop];
          }
        }
      }
    });
  }
  changeMonto(detalle: any, nombrecol, event: any, table: any) {
    if (isNaN(event.target.value)) {
      alert('Dato invalido, favor de verificar.');
      event.target.focus();
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    /*se recibe un detalle de la pantalla es decir uno con split por lo que se debe obtener el detalle de donde proviene*/
    let detalleSource = this.detallesProformaIdxIdInterno[detalle.idInterno];
    detalleSource[nombrecol] = event.target.value;
    // HNA: ocurrio un cambio correcto en la proforma por lo que se recalcula el detalle impactado y los totales de proforma
    this.recalculateDetalle(detalleSource, this.detallesProforma);
    //re re construlle los detalles para vista
    this.detallesProfToRender = this.splitDetalles(this.detallesProforma, this.mesInicio);

    console.log(detalle);

  }

  isValidDetalles(detalles, excludeProperties) {
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
    for (let i = 0; i < detalles.length; i++) {
      this.sumColumnsForDetalle(detalles[i], targetColumn, columnsNames);
    }
    return detalles;
  }

  sumColumnsForDetalle(detalle, targetColumn, columnsNames) {
    let suma = 0;
    for (let j = 0; j < columnsNames.length; j++) {
      const colName = columnsNames[j];
      if(!isNaN(detalle[colName])) {
        suma += parseFloat(detalle[colName]);
      }else{
        console.warn('La columna ' + colName + 'del detalle ' + detalle.nombre_rubro + ', no es numero');
      }
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
    this.sumColumnsForDetalle(detalleModificado, 'ejercicio_resultado', ['enero_monto_resultado',
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
    let detallesTotalesNoEvaluados=[];
    let detallesTotalesEvaluados=[];
    detallesTotales.forEach(detalleTotal => {
      let evaluado=this.evaluaDetalleTotal(detalleTotal, detalles);
      if(!evaluado) {
        detallesTotalesNoEvaluados.push(detalleTotal);
      }else{
        detallesTotalesEvaluados.push(detalleTotal);
      }
    });
    let allDetalles=detalles.concat(detallesTotalesEvaluados);
    detallesTotalesNoEvaluados.forEach(detalleTotal => {
      this.evaluaDetalleTotal(detalleTotal, allDetalles);
    });
    return detallesTotales;
  }

  evaluaDetalleTotal(detalleTotal,allDetalles){
      let evaluado=false;
      const aritmeticas = {};
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
      allDetalles.forEach(detalle => {
        const detalleClave = detalle.clave_rubro;
        if (detalleTotal.aritmetica.indexOf(detalleClave) !== -1) {
          for (const prop in aritmeticas) {
            aritmeticas[prop] = aritmeticas[prop].replace(detalleClave, '(' + detalle[prop + '_resultado'] + ')');
          }
        }
      });
      for (const prop in aritmeticas) {
        try {
          // tslint:disable-next-line: no-eval
          detalleTotal[prop + '_resultado'] = eval(aritmeticas[prop]);
          evaluado = true;
        } catch (e) {
          console.error('Error de evaluacion de la expresion', e);
          evaluado = false;
          break;
        }
      }
      return evaluado;
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
    return alldetalles;
  }

  splitDetalle(detalle, mesinicio) {

    const detReal = Object.assign({}, detalle);
    const detprof = Object.assign({}, detalle);
    for (const prop in this.ponderacionCampos) {
      if (this.ponderacionCampos[prop] > mesinicio) {
        //detReal[prop] = 0;
        detReal.tipo = 'real';
        //-> proformados
      } else {
        //detprof[prop] = 0;
        detprof.tipo = 'proform';
        //-> reales
      }
    }
    return [detReal, detprof];
  }
}
