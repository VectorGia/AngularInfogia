
import { Component, OnInit, ViewChild } from '@angular/core';
import { MontosconsolidadosService } from 'src/app/core/service/montosconsolidados.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  constructor(private montosServies: MontosconsolidadosService,
              private fB: FormBuilder, private proformaService: ProformaService,
              private empresaService: CompaniaService, private centroService: CentrosService,
              private activeRoute: ActivatedRoute) {
    // this.getProforma();

  }

  displayedColumns: string[] = ['nombre', 'total', 'aant', 'ejercicio', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  tresnueve = false;
  seisseis = false;
  nuevetres = false;
  doce = false;
  detallesProformaToRender: any;
  detallesProformaOriginal: any;
  detallesProformaOriginalIndexado: any;
  mesInicio: any;
  ajustes: any;
  tiposCambio = [];
  conAjusteSinAjuste = [{etiqueta:'Con ajuste',valor:true},{etiqueta:'Sin ajuste',valor:false}];
  formProforma: FormGroup;
  empresas: any;
  proforma: any;
  centros: any;
  id: any;

  ponderacionCampos = {
    'total_resultado': -1, 'anios_posteriores_resultado ': -1, 'ejercicio_resultado': -1, 'enero_monto_resultado': 1,
    'febrero_monto_resultado': 1, 'marzo_monto_resultado': 3, 'abril_monto_resultado': 4, 'mayo_monto_resultado': 5,
    'junio_monto_resultado': 6, 'julio_monto_resultado': 7, 'agosto_monto_resultado': 8, 'septiembre_monto_resultado': 9,
    'octubre_monto_resultado': 10, 'noviembre_monto_resultado': 11, 'diciembre_monto_resultado': 12
  };
  esProformaContable = false;

  ngOnInit() {
    this.fetchCentros();
    this.fetchEmpresa();

    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      this.proformaService.getProformaby(this.id)
      .subscribe(res => {
        this.proforma = res;
        console.log('proforma obtenida: ', this.proforma);
      });
    });
  }

  onChangeTipoCaptura(value) {
    this.esProformaContable = (value == 1);
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


  render(form: NgForm) {
    this.proformaService.getProforma(form).subscribe(res => {
      this.detallesProformaOriginal = res;
      this.detallesProformaOriginalIndexado = {};
      //indexamos los detalles originales para acceder a ellos mediante el id interno(uid o id)
      for (const detalle of this.detallesProformaOriginal) {
        this.detallesProformaOriginalIndexado[detalle.idInterno] = detalle;
      }
      if (this.detallesProformaOriginal.length > 0) {
        this.mesInicio = this.detallesProformaOriginal[0].mes_inicio;
        this.detallesProformaToRender = this.splitDetalles(this.detallesProformaOriginal, this.mesInicio);
      }
      console.log('Proforma: ', this.detallesProformaToRender);
    });
    this.proformaService.getAjustes(form).subscribe(res => {
      this.ajustes = res;
      console.log('getAjustes %o', res);
    });
    this.proformaService.getTiposCambio(form).subscribe(res => {
      const respuesta = res;

      for (const key in respuesta) {
          this.tiposCambio.push({etiqueta: key, valor: respuesta[key]});
      }
      console.log('getTiposCambio %o', this.tiposCambio);
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
    if (this.isValidDetalles(this.detallesProformaToRender, ['nombre_rubro', 'fecha_captura', 'clave_rubro', 'aritmetica'])) {
      this.proformaService.addProforma(this.detallesProformaToRender)
        .subscribe(res => {
          alert('Se guardo');
        });
    }
  }
/*a cada detalle de la proforma calculada, se le aplica un factor correspondiente al tipo de cambio */
  recalculaPorTipoCambio(factor: number) {
    let detalles=this.detallesProformaOriginal;
    for (let i = 0; i < detalles.length; i++) {
      let detActual=detalles[i];
      for (const prop in detActual) {
        let valor=detActual[prop];
        if (!isNaN(valor)) {
          detalles[i]=valor*factor;
        }
      }
    }
  }
  recalculaPorAjusteBalanza(aplicar:boolean) {
    if(aplicar){
      console.log('Se aplicara ajustes');
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
    /*se recibe un detalle de la pantalla es decir uno con split por lo que se debe obtener el detalle de donde proviene*/
    let detalleSource = this.detallesProformaOriginalIndexado[detalle.idInterno];
    detalleSource[nombrecol] = event.target.value;
    // HNA: ocurrio un cambio correcto en la proforma por lo que se recalcula el detalle impactado y los totales de proforma
    this.recalculateDetalle(detalleSource, this.detallesProformaOriginal);
    //re re construlle los detalles para vista
    this.detallesProformaToRender = this.splitDetalles(this.detallesProformaOriginal, this.mesInicio);
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
    detallesTotales.forEach(detalleTotal => {
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
      detalles.forEach(detalle => {
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
}
