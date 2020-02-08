import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { ProformaComponent } from './proforma/proforma.component';
import { EstatusComponent } from './estatus/estatus.component';
import { BuscarproformaComponent } from './buscarproforma/buscarproforma.component';
import { ProformaDetailsComponent } from './proforma-details/proforma-details.component';


const routes: Routes = [
  {
    path: 'estatus',
    component: EstatusComponent
  },
  {
    path: 'proforma',
    component: ProformaComponent
  },
  {
    path: 'buscar/details/:id',
    component: ProformaDetailsComponent
  },
  {
    path: 'extraccion',
    component: ExtraccionComponent
  },
  {
    path: 'buscar',
    component: BuscarproformaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
