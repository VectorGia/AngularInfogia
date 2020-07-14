import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformaRoutingModule } from './proforma-routing.module';
import { EstatusComponent } from './estatus/estatus.component';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { ProformaComponent } from './proforma/proforma.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BuscarproformaComponent } from './buscarproforma/buscarproforma.component';
import { EstatusEditComponent } from './estatus-edit/estatus-edit.component';
import {SharedModule} from '../shared/shared.module';
import { ReportesComponent } from './reportes/reportes.component';
import { DialogReportComponent } from './dialog-report/dialog-report.component';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {DialogOverviewDialogComponent} from '../shared/dialog-overview-dialog/dialog-overview-dialog.component';
import { CronEditorModule } from 'projects/cron-editor/src/lib/cron-editor.module';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [EstatusComponent,
                ExtraccionComponent,
                ProformaComponent,
                BuscarproformaComponent,
                EstatusEditComponent,
                ReportesComponent,
                DialogReportComponent],
  imports: [
    CommonModule,
    ProformaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    CronEditorModule,
    FormsModule,
    NgxCurrencyModule
  ],
  entryComponents: [
  DialogReportComponent,
  ]
})
export class ProformaModule { }
