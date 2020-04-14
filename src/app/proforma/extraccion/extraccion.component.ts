import { Component, OnInit, ViewChild } from '@angular/core';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Compania } from 'src/app/core/models/compania';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { EtlprogService } from 'src/app/core/service/etlprog.service';
import { PreproformaService } from 'src/app/core/service/preproforma.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {LoaderService} from '../../core/service/loader.service';
import { CronOptions, CronGenComponent } from 'ngx-cron-editor';
import { Año } from 'src/app/core/models/año.model';
import { Mes } from 'src/app/core/models/mes.model';


@Component({
  selector: 'app-extraccion',
  templateUrl: './extraccion.component.html',
  styleUrls: ['./extraccion.component.css']
})
export class ExtraccionComponent implements OnInit {
  public cronExpression = '0 0 1/1 * *';
  public isCronDisabled = false;
  public cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',

    defaultTime: '00:00:00',

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,

    use24HourTime: true,
    hideSeconds: false,

    cronFlavor: 'standard'
  };

  @ViewChild('cronEditorDemo', { static: false })
  displayedColumns: string[] = ['idDB', 'id', 'empresa', 'abrev', 'etl', 'cadconexion', 'cambio'];
  dataSource: any;
  checked = false;
  opcion: boolean;
  gender = 1;
  cronEditorDemo: CronGenComponent;
  cronForm: FormControl;
  selection = new SelectionModel<Compania>(true, []);
  formFecha: FormGroup;
  datos: any;
  datosCron = [];
  anios: Año[] = [
    {value: 2005, viewValue: 2005},
    {value: 2006, viewValue: 2006},
    {value: 2007, viewValue: 2007},
    {value: 2008, viewValue: 2008},
    {value: 2009, viewValue: 2009},
    {value: 2010, viewValue: 2010},
  ];
  meses: Mes[] = [
    {value: 1, viewValue: 'Enero'},
    {value: 2, viewValue: 'Febrero'},
    {value: 3, viewValue: 'Marzo'},
    {value: 4, viewValue: 'Abril'},
    {value: 5, viewValue: 'Mayo'},
    {value: 6, viewValue: 'Junio'},
    {value: 7, viewValue: 'Julio'},
    {value: 8, viewValue: 'Agosto'},
    {value: 9, viewValue: 'Septiembre'},
    {value: 10, viewValue: 'Octubre'},
    {value: 11, viewValue: 'Noviembre'},
    {value: 12, viewValue: 'Diciembre'},
  ];
  constructor(private cS: CompaniaService,
              private fB: FormBuilder,
              private eS: EtlprogService,
              private pProformaService: PreproformaService,
              private load: LoaderService,
              private etlService: EtlprogService
              ) {
    this.getDatosCron();
    this.buildForm();
  }

  ngOnInit() {
    this.obtener();
   
    this.cronForm = new FormControl(this.cronExpression);
  }

  cronFlavorChange() {
    this.cronEditorDemo.options = this.cronOptions;
  }

  buildForm() {
    this.formFecha = this.fB.group({
      anioInicio: ['', Validators.required],
      anioFin: ['', Validators.required],
      mes: ['', Validators.required],
    });
  }
  getDatosCron() {
    this.etlService.getDatosExtraccion()
    .subscribe(data => {
      this.datos = data;
      console.log('datos de extraccion: ', this.datos);
      this.datosCron = [];
      for (const key in data) {
        this.datosCron.push({etiqueta: key, valor: data[key]});
      }
      console.log('datos de extraccion: ', this.datosCron);
    });
  }
  obtener() {
    this.cS.getAllCompania()
    .subscribe(
      x => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = x;
        console.log(this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros!' + error);
      });
  }
  opcr() {
    this.opcion = false;
  }

  opc() {
    this.opcion = true;
  }
  extraccionManualContable(form: NgForm) {
    this.etlService.extraccionManualCont(form)
    .subscribe(resul => {
      Swal.fire(
        'Listo!',
        'Se realizo la extracción!',
        'success'
      );
    },
    error => {
      Swal.fire(
        'Error!',
        'Ocurrio un error durante la extracción!',
        'error'
      );
    }
    );
  }
  extraccionManualflujo(form: NgForm) {
    this.etlService.extraccionManualflujo(form)
    .subscribe(resul => {
      Swal.fire(
        'Listo!',
        'Se realizo la extracción!',
        'success'
      );
    },
    error => {
      Swal.fire(
        'Error!',
        'Ocurrio un error durante la extracción!',
        'error'
      );
    }
    );
  }

  extraccion() {
    this.pProformaService.getPreProforma()
    .subscribe( res => {
      Swal.fire(
        'Listo!',
        'Se realizo la extracción!',
        'success'
      );
    },
    error => {
      Swal.fire(
        'Error!',
        'Ocurrio un error durante la extracción!',
        'error'
      );
    });
  }

  sendProgFlujo() {
    console.log('cron: ', this.cronExpression);
    this.etlService.postETLFlujo(this.cronExpression)
      .subscribe(res => {
        Swal.fire(
          'Listo!',
          'Se programo la extracción!',
          'success'
        );
      },
      error => {
        Swal.fire(
          'Error!',
          'Ocurrio un error durante la extracción!',
          'error'
        );
      });
  }
  sendProgMontoFlujo() {
    console.log('cron: ', this.cronExpression);
    this.etlService.extraccionProgMontosFlujo(this.cronExpression)
    .subscribe(res => {
      Swal.fire(
        'Listo!',
        'Se programo la extracción!',
        'success'
      );
    },
    error => {
      Swal.fire(
        'Error!',
        'Ocurrio un error durante la extracción!',
        'error'
      );
    });
  }
  sendProgMontoCont() {
    console.log('cron: ', this.cronExpression);
    this.etlService.extraccionProgMontosCont(this.cronExpression)
    .subscribe(res => {
      Swal.fire(
        'Listo!',
        'Se programo la extracción!',
        'success'
      );
    },
    error => {
      Swal.fire(
        'Error!',
        'Ocurrio un error durante la extracción!',
        'error'
      );
    });
  }
 
}
