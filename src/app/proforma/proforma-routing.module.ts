import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { ProformaComponent } from './proforma/proforma.component';
import { EstatusComponent } from './estatus/estatus.component';
import { BuscarproformaComponent } from './buscarproforma/buscarproforma.component';
import { EstatusEditComponent } from './estatus-edit/estatus-edit.component';
import {ReportesComponent} from './reportes/reportes.component';


const routes: Routes = [
  {
    path: 'estatus',
    component: EstatusComponent
  },
  {
    path: 'estatus/edit/:id',
    component: EstatusEditComponent
  },
  {
    path: 'proforma',
    component: ProformaComponent
  },
  {
    path: 'proforma/:id',
    component: ProformaComponent
  },
  {
    path: 'extraccion',
    component: ExtraccionComponent
  },
  {
    path: 'buscar',
    component: BuscarproformaComponent
  },
  {
    path: 'reportes',
    component: ReportesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
