import {Component, OnInit, ViewChild} from '@angular/core';
import {CompaniaService} from 'src/app/core/service/compania.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Compania} from 'src/app/core/models/compania';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {EtlprogService} from 'src/app/core/service/etlprog.service';
import {PreproformaService} from 'src/app/core/service/preproforma.service';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {LoaderService} from '../../core/service/loader.service';
import {CronOptions, CronGenComponent} from 'ngx-cron-editor';
import {Año} from 'src/app/core/models/año.model';
import {Mes} from 'src/app/core/models/mes.model';


@Component({
  selector: 'app-extraccion',
  templateUrl: './extraccion.component.html',
  styleUrls: ['./extraccion.component.css']
})
export class ExtraccionComponent implements OnInit {
  public cronExpression = '0 0 0 ? * MON,SUN *';
  public isCronDisabled = false;
  executing = false;
  public cronOptionsSemanal: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: '00:00:00',
    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: true,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,
    use24HourTime: true,
    hideSeconds: false,
    cronFlavor: 'standard'
  };
  public cronOptionsMensual: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: '00:00:00',
    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: true,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,
    use24HourTime: true,
    hideSeconds: false,
    cronFlavor: 'standard'
  };

  @ViewChild('cronEditorDemo', {static: false})
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
  anios: Año[] = [];
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
    let anioActual = new Date().getFullYear();
    for (let i = 2005; i <= anioActual; i++) {
      this.anios.push({value: i, viewValue: i});
    }
  }

  ngOnInit() {
    this.obtener();

    this.cronForm = new FormControl(this.cronExpression);
  }


  buildForm() {
    this.formFecha = this.fB.group({
      anioInicio: [''],
      anioFin: [''],
      mes: [''],
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

  confirmExtraccion(applyFun) {
    Swal.fire({
      title: '¿Estas seguro de ejecutar la extracción?',
      text: '!Podria demorar varios segundos e incluso minutos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Aplicar'
    }).then((result) => {
      if (result.value) {
        applyFun();
      }
    });
  }

  extraccionManualContable(request) {
    this.confirmExtraccion(() => {
      request['mes'] = -1;
      if (!request['anioInicio']) {
        request['anioInicio'] = -1;
      }
      if (!request['anioFin']) {
        request['anioFin'] = -1;
      }
      this.executing = true;
      this.etlService.extraccionManualCont(request)
        .subscribe(resul => {
            this.executing = false;
            Swal.fire('Listo!', 'Se realizo la extracción!', 'success');
          },
          error => {
            this.executing = false;
            Swal.fire('Error!', 'Ocurrio un error durante la extracción!', 'error'
            );
          }
        );
    });
  }

  extraccionManualflujo(request) {
    this.confirmExtraccion(() => {
      this.executing = true;
      if (!request['anioInicio']) {
        request['anioInicio'] = -1;
      }
      if (!request['anioFin']) {
        request['anioFin'] = -1;
      }
      this.etlService.extraccionManualflujo(request)
        .subscribe(resul => {
            this.executing = false;
            Swal.fire('Listo!', 'Se realizo la extracción!', 'success');
          },
          error => {
            this.executing = false;
            Swal.fire('Error!', 'Ocurrio un error durante la extracción!', 'error');
          }
        );
    });
  }

  extraccion() {
    this.confirmExtraccion(() => {
      this.executing = true;
      this.pProformaService.getPreProforma()
        .subscribe(res => {
            this.executing = false;
            Swal.fire(
              'Listo!',
              'Se realizo la extracción!',
              'success'
            );
          },
          error => {
            this.executing = false;
            Swal.fire(
              'Error!',
              'Ocurrio un error durante la extracción!',
              'error'
            );
          });
    });
  }

  extraccionProgContable() {
    console.log('cron: ', this.cronExpression);
    if(!this.cronExpression){
      Swal.fire('Error!', 'La expresión cron es requerida!', 'error');
      return;
    }
    this.confirmExtraccion(() => {
      this.etlService.rescheduleContable(this.cronExpression)
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
    });
  }

  extraccionProgFlujo() {
    console.log('cron: ', this.cronExpression);
    if(!this.cronExpression){
      Swal.fire(
        'Error!',
        'La expresión cron es requerida!',
        'error'
      );
      return;
    }
    this.confirmExtraccion(() => {
      this.etlService.rescheduleFlujo(this.cronExpression)
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
    });
  }

  sendProgMontoFlujo() {
    console.log('cron: ', this.cronExpression);
    if(!this.cronExpression){
      Swal.fire(
        'Error!',
        'La expresión cron es requerida!',
        'error'
      );
      return;
    }
    this.confirmExtraccion(() => {
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
    });
  }

  sendProgMontoCont() {
    console.log('cron: ', this.cronExpression);
    if(!this.cronExpression){
      Swal.fire(
        'Error!',
        'La expresión cron es requerida!',
        'error'
      );
      return;
    }
    this.confirmExtraccion(() => {
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
    });
  }

}
