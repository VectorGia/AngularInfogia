import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { ProformaComponent } from './proforma/proforma.component';
import { EstatusComponent } from './estatus/estatus.component';


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
    path: 'extraccion',
    component: ExtraccionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule { }
