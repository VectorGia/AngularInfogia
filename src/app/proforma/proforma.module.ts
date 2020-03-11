import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProformaRoutingModule } from './proforma-routing.module';
import { EstatusComponent } from './estatus/estatus.component';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { ProformaComponent } from './proforma/proforma.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { BuscarproformaComponent } from './buscarproforma/buscarproforma.component';
import { EstatusEditComponent } from './estatus-edit/estatus-edit.component';
import {SharedModule} from '../shared/shared.module';
import { ReportesComponent } from './reportes/reportes.component';


@NgModule({
  declarations: [EstatusComponent,
                ExtraccionComponent,
                ProformaComponent,
                BuscarproformaComponent,
                EstatusEditComponent,
                ReportesComponent],
  imports: [
    CommonModule,
    ProformaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProformaModule { }
