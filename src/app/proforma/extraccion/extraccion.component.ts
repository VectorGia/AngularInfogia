import { Component, OnInit } from '@angular/core';
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
import { CronOptions } from 'cron-editor';
@Component({
  selector: 'app-extraccion',
  templateUrl: './extraccion.component.html',
  styleUrls: ['./extraccion.component.css']
})
export class ExtraccionComponent implements OnInit {
  displayedColumns: string[] = ['idDB', 'id', 'empresa', 'abrev', 'etl', 'cadconexion', 'cambio'];
  dataSource: any;
  checked = false;
  selection = new SelectionModel<Compania>(true, []);
  formFecha: FormGroup;
  cronForm: FormControl;
  cronExpression = '4 3 2 12 1/1 ? *';
  isCronDisabled = false;
  cronOptions: CronOptions = {

    formSelectClass: 'form-control cron-editor-select',
    formCheckboxClass: 'cron-editor-radio',
    formRadioClass: 'cron-editor-checkbox',
    formInputClass: 'form-control cron-editor-input',

    defaultTime: '10:00:00',
    use24HourTime: true,

    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,

    hideSeconds: false,
    removeSeconds: false,
    removeYears: false
  };
  constructor(private cS: CompaniaService,
              private fB: FormBuilder,
              private eS: EtlprogService,
              private pProformaService: PreproformaService,
              private load: LoaderService,
              ) {
    this.buildForm();
  }

  ngOnInit() {
    this.cronForm = new FormControl('0 0 1/1 * *');
    this.obtener();
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

  save(form: NgForm) {
    this.eS.postETL(form).subscribe(
      res => {
        let id = res['TEXT_FECH_EXTR'];
        alert('Progrmación lista');
    });
  }

  buildForm() {
    this.formFecha = this.fB.group({
      TEXT_FECH_EXTR: ['', Validators.required],
      TEXT_HORA_EXTR: ['', Validators.required]
    });
  }

  extraccion() {
    this.pProformaService.getPreProforma()
    .subscribe( res => {
      Swal.fire(
        'Listo!',
        'Se realizo la extracción!',
        'success'
      );
    });
  }
}
