import { Component, OnInit, ViewChild } from '@angular/core';
import { CronOptions, CronGenComponent } from 'ngx-cron-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { EtlprogService } from 'src/app/core/service/etlprog.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cron',
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.css']
})
export class CronComponent implements OnInit {
  datos: any;
  datosCron = [];
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
  cronEditorDemo: CronGenComponent;

  cronForm: FormControl;

  constructor(private etlService: EtlprogService) {}

  ngOnInit(): void {
    this.cronForm = new FormControl(this.cronExpression);
  }

  cronFlavorChange() {
    this.cronEditorDemo.options = this.cronOptions;
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
      console.log('datos de extraccion Cron: ', this.datosCron);
    });
  }
  sendProg() {
    console.log('cron: ', this.cronExpression);
    this.etlService.rescheduleContable(this.cronExpression)
      .subscribe(res => {
        Swal.fire(
          'Listo',
          'Se programo la extracción',
          'success'
        );
      });
  }
}
