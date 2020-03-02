import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { MontosconsolidadosService } from 'src/app/core/service/montosconsolidados.service';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { CentrosService } from 'src/app/core/service/centros.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proforma-details',
  templateUrl: './proforma-details.component.html',
  styleUrls: ['./proforma-details.component.css']
})
export class ProformaDetailsComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'total', 'aant',
                                'ejercicio', 'enero', 'febrero', 'marzo', 'abril', 'mayo',
                                'junio', 'julio', 'agosto',
                                'septiembre', 'octubre', 'noviembre', 'diciembre'/* , 'apost' */];
  displayedColumn: string[] = ['aant', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre', 'apost'];
  dataSource: any;
  tresnueve = false;
  seisseis = false;
  nuevetres = false;
  proforma: any;
  formProforma: FormGroup;
  id: any;
  empresas: any;
  centros: any;
  constructor(private montosServies: MontosconsolidadosService,
              private fB: FormBuilder,
              private proformaService: ProformaService,
              private empresaService: CompaniaService,
              private centroService: CentrosService,
              private activeRoute: ActivatedRoute) {
    // this.getProforma();

  }

  ngOnInit() {
    this.buildProforma();
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

  buildProforma() {
    this.formProforma = this.fB.group({
      anio: [2019],
      tipo_captura_id: [2],
      tipo_proforma_id: [''],
      empresa_id: [''],
      centro_costo_id: ['']
    });
  }

  onChange(value) {
    console.log(value);
    if (value === '4') {
      this.tresnueve = true;
      this.seisseis = false;
      this.nuevetres = false;
    }
    if (value === '5') {
      this.tresnueve = false;
      this.seisseis = true;
      this.nuevetres = false;
    }
    if (value === '6') {
      this.tresnueve = false;
      this.seisseis = false;
      this.nuevetres = true;
    }
  }
  save(form: NgForm) {
    this.proformaService.getProforma(form).subscribe(res => {
      this.proforma = res;
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

  guardarProforma() {
    if (this.isValidDetalles(this.proforma, ['nombre_rubro', 'fecha_captura', 'clave_rubro', 'aritmetica'])) {
      this.recalculateAll(this.proforma); // /HNA:Antes de mandar a guardar la proforma se recalcula completa
      this.proformaService.updateProforma(this.id, this.proforma)
      .subscribe( res => {
        alert('Se guardo');
      });
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
    /// HNA:dado que en las vista se divide entre 1000, aqui los montos ingresados se multiplicaran por 1000
    detalle[nombrecol] = event.target.value * 1000;
    // HNA: ocurrio un cambio correcto en la proforma por lo que se recalcula el detalle impactado y los totales de proforma
    // verificar que en pantala se ven los cambios si no es asi hay que repintar toda la proforma
    this.recalculateDetalle(detalle, this.proforma);
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
    // tslint:disable-next-line: prefer-const
    let detallesTotales = [];
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

    this.sumColumns(detalles, 'ejercicio_resultado', ['enero_monto_resultado', 'febrero_monto_resultado', 'marzo_monto_resultado',
        'abril_monto_resultado', 'mayo_monto_resultado', 'junio_monto_resultado', 'julio_monto_resultado', 'agosto_monto_resultado',
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
      aritmeticas["marzo_monto"] = detalleTotal.aritmetica;
      aritmeticas["abril_monto"] = detalleTotal.aritmetica;
      aritmeticas["mayo_monto"] = detalleTotal.aritmetica;
      aritmeticas["junio_monto"] = detalleTotal.aritmetica;
      aritmeticas["julio_monto"] = detalleTotal.aritmetica;
      aritmeticas["agosto_monto"] = detalleTotal.aritmetica;
      aritmeticas["septiembre_monto"] = detalleTotal.aritmetica;
      aritmeticas["octubre_monto"] = detalleTotal.aritmetica;
      aritmeticas["noviembre_monto"] = detalleTotal.aritmetica;
      aritmeticas["diciembre_monto"] = detalleTotal.aritmetica;
      aritmeticas["ejercicio"] = detalleTotal.aritmetica;
      aritmeticas["acumulado"] = detalleTotal.aritmetica;
      aritmeticas["total"] = detalleTotal.aritmetica;
      detalles.forEach(detalle => {
        const detalleClave = detalle.clave_rubro;
        if (detalleTotal.aritmetica.indexOf(detalleClave) !== -1) {
          for (const prop in aritmeticas) {
            aritmeticas[prop] = aritmeticas[prop].replace(detalleClave, detalle[prop + '_resultado']);
          }
        }

      });
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
}
