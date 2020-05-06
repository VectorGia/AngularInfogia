import {Component, OnInit} from '@angular/core';
import {MontosconsolidadosService} from 'src/app/core/service/montosconsolidados.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProformaService} from 'src/app/core/service/proforma.service';
import {CompaniaService} from 'src/app/core/service/compania.service';
import {CentrosService} from 'src/app/core/service/centros.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TipoproformaService} from 'src/app/core/service/tipoproforma.service';
import {TipocapturaService} from 'src/app/core/service/tipocaptura.service';
import Swal from 'sweetalert2';
import {ExcelService} from '../../core/service/excel.service';
type AOA = any[][];
@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.css']
})
export class ProformaComponent implements OnInit {
  constructor(private fB: FormBuilder, private proformaService: ProformaService,
              private empresaService: CompaniaService, private centroService: CentrosService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private tipoproformaService: TipoproformaService,
              private tipocapturaService: TipocapturaService,
              private exportService: ExcelService) {
  }

  displayedColumns: string[] = ['nombre', 'total', 'aant', 'ejercicio', 'enero', 'febrero', 'marzo',
                                'abril', 'mayo', 'junio', 'julio', 'agosto',
                                'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  tresnueve = false;
  seisseis = false;
  nuevetres = false;
  doce = false;
  detallesProfToRender: any = [];
  detallesProforma: any;
  detallesProformaIdxIdRubro: any;
  detallesProformaIdxIdInterno: any;
  mesInicio: any;
  proformaEditable: any;
  ajustes: any;
  tiposCambio = [];
  aniosProforma: any;
  conAjusteSinAjuste = [{etiqueta: 'Sin ajuste', valor: false}, { etiqueta: 'Con ajuste', valor: true}];
  ajustarPorDefecto = false;
  formProforma: FormGroup;
  empresas: any;
  proforma: any;
  centros: any;
  consulta: any = false;
  id: any = null;
  proformaExistente: any = false;
  tiposProforma: any;
  tiposCaptura: any;
  ponderacionCampos = {
    ' total_resultado ': -1, 'anios_posteriores_resultado ': -1, ' ejercicio_resultado': -1, ' enero_monto_resultado': 1,
    ' febrero_monto_resultado': 1, ' marzo_monto_resultado': 3, ' abril_monto_resultado': 4, ' mayo_monto_resultado': 5,
    ' junio_monto_resultado': 6, ' julio_monto_resultado': 7, ' agosto_monto_resultado': 8, ' septiembre_monto_resultado': 9,
    ' octubre_monto_resultado': 10, ' noviembre_monto_resultado': 11, ' diciembre_monto_resultado': 12
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
      if (params.id) {
        this.id = params.id;
        this.proformaService.getProformaby(this.id)
          .subscribe(res => {
            this.formProforma.patchValue(res[0]);
            this.consulta = true;
            this.proformaExistente = true;
            this.renderDetallesProforma(res);
            this.getTiposCambio({centro_costo_id: res[0].centro_costo_id, anio: res[0].anio, tipo_captura_id: res[0].tipo_captura_id});
          });
      }
    });
  }
builForm() {
  this.formProforma = this.fB.group({
    anio: [''],
    tipo_proforma_id: [''],
    tipo_captura_id: [''],
    empresa_id: [''],
    centro_costo_id: ['']
  });
}

getTiposCambio(form) {
  this.proformaService.getTiposCambio(form).subscribe(res => {
    this.tiposCambio = [];
    for (const key in res) {
      this.tiposCambio.push({etiqueta: key, valor: res[key]});
    }
    console.log('getTiposCambioo %o', this.tiposCambio);
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

  proformar(form: any) {
    this.proformaService.getProforma(form)
    .subscribe(
      res => {
        this.consulta = true;
        this.renderDetallesProforma(res);
      },
      error => {
        Swal.fire(
          'Error!',
           error,
          'warning'
        );
        console.error(error);
      }
    );
    if (this.esProformaContable) {
      this.proformaService.getAjustes(form).subscribe(res => {
        this.ajustes = res;
        console.log('getAjustess %o', res);
      });
    }
  }
  renderDetallesProforma(detallesProforma) {
    this.detallesProforma = detallesProforma;
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
      this.proformaEditable = !this.detallesProforma[0].editable;
      this.detallesProfToRender = this.splitDetalles(this.detallesProforma, this.mesInicio);
    }
    console.table('Proforma: ', this.detallesProfToRender);
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
    if (this.isValidDetalles(this.detallesProfToRender, ['nombre_rubro',
    'fecha_captura', 'clave_rubro', 'aritmetica', 'idInterno', 'editable', 'campoEnAjustes', 'hijos', 'estilo', 'tipo'])) {
      this.proformaService.addProforma(this.detallesProforma)
        .subscribe(res => {
          Swal.fire(
            'Listo!',
             'La proforma se guardo!',
            'success'
          );
          // alert('Se guardo');
        },
        error => {
          Swal.fire(
            'Error!',
             error,
            'warning'
          );
        }
        );
    }
  }
  exitAlert() {
    Swal.fire({
      title: 'Estas seguro de salir?',
      text: 'Se perderan los datos sin guardar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.value) {
          this.router.navigate(['/proforma/proforma']);
          this.consulta = false;
          this.formProforma.reset();
          this.detallesProfToRender = [];
      }
    });
  }

  alertUpdate() {
    Swal.fire({
      title: 'Estas seguro de guardar los cambios?',
      text: 'Se modificara la proforma!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si, actualiza!'
    }).then((result) => {
      if (result.value) {
        this.updateProforma();
      }
    });
  }
  updateProforma() {
    if (this.isValidDetalles(this.detallesProforma, ['nombre_rubro', 'fecha_captura', 'clave_rubro', 'aritmetica', 'idInterno', 'editable',
                                                                    'campoEnAjustes', 'hijos', 'estilo', 'tipo'])) {
      this.recalculateAll(this.detallesProforma); // /HNA:Antes de mandar a guardar la proforma se recalcula completa
      this.proformaService.updateProforma(this.id, this.detallesProforma)
        .subscribe(
        res => {
          Swal.fire(
            'Actualizada!',
            'Se guardaron los cambios.',
            'success'
          );
          console.log(res);
        },
        error => {
          Swal.fire(
            'Error!',
             error,
            'warning'
          );
        });
    }
  }
/*a cada detalle de la proforma calculada, se le aplica un factor correspondiente al tipo de cambio */
  recalculaPorTipoCambio(factor) {
    const detalles = [];
    for (let i = 0; i < this.detallesProforma.length; i++) {
      detalles.push( Object.assign({}, this.detallesProforma[i]));
    }
    if ( factor != 1 ) {
      for (let i = 0; i < detalles.length; i++) {
        const detActual = detalles[i];
        for (const prop in detActual) {
          const valor = detActual[prop];
          if (!isNaN(valor)) {
            detActual[prop] = valor * factor;
          }
        }
      }
    }
    this.detallesProfToRender = this.splitDetalles(detalles, this.mesInicio);
  }

  recalculaPorAjusteBalanza(aplicar) {
    var excludeProps = ['id_proforma',
      'mes_inicio',
      'centro_costo_id',
      'anio',
      'tipo_proforma_id',
      'tipo_captura_id',
      'idInterno',
      'clave_rubro',
      'rubro_id',
      'tipo',
      'estilo',
      'aritmetica',
      'id'];
    this.ajustes.forEach(ajuste => {
      const detalleProforma = this.detallesProformaIdxIdRubro[ajuste.rubro_id];
      for (const prop in detalleProforma) {
        const valor = detalleProforma[prop];

        if (valor && !isNaN(valor) && excludeProps.indexOf(prop) === -1) {
          if (aplicar) {
            detalleProforma[prop] = valor + ajuste[prop];
          } else {
            detalleProforma[prop] = valor - ajuste[prop];
          }
        }
      }
    });
    if (this.ajustes.length > 0) {
      this.recalculateAll(this.detallesProforma);
      this.detallesProfToRender = this.splitDetalles(this.detallesProforma, this.mesInicio);
    }
  }
  changeMonto(detalle: any, nombrecol, event: any) {
    if (isNaN(event.target.value)) {
      alert('Dato invalido, favor de verificar.');
      event.target.focus();
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    /*se recibe un detalle de la pantalla es decir uno con split por lo que se debe obtener el detalle de donde proviene*/
    const detalleSource = this.detallesProformaIdxIdInterno[detalle.idInterno];
    detalleSource[nombrecol] = event.target.value;
    // HNA: ocurrio un cambio correcto en la proforma por lo que se recalcula el detalle impactado y los totales de proforma
    this.recalculateDetalle(detalleSource, this.detallesProforma);
    // re re construlle los detalles para vista
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
  export() {
    console.log(this.detallesProfToRender);
    this.exportService.exportProforma(this.detallesProfToRender);
  }

  import(fileList: FileList) {
    const self = this;
    this.exportService.importExcel(fileList, (res) => {
      const datosProforma = res[0];
      self.formProforma.patchValue(datosProforma);
      self.renderDetallesProforma(res);
      self.recalculateAll(self.detallesProforma);
      if (datosProforma.id_proforma > 0) {
        self.consulta = true;
        self.proformaExistente = true;
        self.getTiposCambio({centro_costo_id: datosProforma.centro_costo_id,
          anio: datosProforma.anio, tipo_captura_id: datosProforma.tipo_captura_id});
      } else {
        self.consulta = false;
        self.proformaExistente = false;
      }
    }
    );
  }



  sumColumnsForDetalle(detalle, targetColumn, columnsNames) {
    let suma = 0;
    for (let j = 0; j < columnsNames.length; j++) {
      const colName = columnsNames[j];
      if (!isNaN(detalle[colName])) {
        suma += parseFloat(detalle[colName]);
      } else {
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
    const detallesTotalesNoEvaluados = [];
    const detallesTotalesEvaluados = [];
    detallesTotales.forEach(detalleTotal => {
      const evaluado = this.evaluaDetalleTotal(detalleTotal, detalles);
      if (!evaluado) {
        detallesTotalesNoEvaluados.push(detalleTotal);
      } else {
        detallesTotalesEvaluados.push(detalleTotal);
      }
    });
    const allDetalles = detalles.concat(detallesTotalesEvaluados);
    detallesTotalesNoEvaluados.forEach(detalleTotal => {
      this.evaluaDetalleTotal(detalleTotal, allDetalles);
    });
    return detallesTotales;
  }

  evaluaDetalleTotal(detalleTotal, allDetalles) {
      let evaluado = false;
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
    console.table('data: ', dataSource);
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
      if (this.ponderacionCampos[prop] >= mesinicio) {
        // detReal[prop] = 0;
        detReal.tipo = 'real';
        // -> proformados
      } else {
        // detprof[prop] = 0;
        detprof.tipo = 'proform';
        // -> reales
      }
    }
    return [detReal, detprof];
  }


}
