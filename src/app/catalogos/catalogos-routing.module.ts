import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonedaEditComponent } from './moneda-edit/moneda-edit.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { CentroCostosEditComponent } from './centro-costos-edit/centro-costos-edit.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { NegocioEditComponent } from './negocio-edit/negocio-edit.component';
import { NegocioComponent } from './negocio/negocio.component';
import { CentroCostosComponent } from './centro-costos/centro-costos.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { MonedaComponent } from './moneda/moneda.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { RubrosComponent } from './rubros/rubros.component';
import { RubrosEditComponent } from './rubros-edit/rubros-edit.component';


const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent
  },
  {
    path: 'cambio',
    component: MonedaComponent
  },
  {
    path: 'proyecto',
    component: ProyectoComponent
  },
  {
    path: 'costos',
    component: CentroCostosComponent
  },
  {
    path: 'negocio',
    component: NegocioComponent
  },
  {
    path: 'negocio/edit/:id',
    component: NegocioEditComponent
  },
  {
    path: 'negocio/edit/:id/:nombre',
    component: NegocioEditComponent
  },
  {
    path: 'negocio/rubros/:id/:nombre',
    component: RubrosComponent
  },
  {
    path: 'negocio/rubros/:id/:nombre/edit/:id',
    component: RubrosEditComponent
  },
  {
    path: 'empresa/edit/:id',
    component: EmpresaEditComponent
  },
  {
    path: 'costos/:id/edit/:id',
    component: CentroCostosEditComponent
  },
  {
    path: 'costos/:id',
    component: CentroCostosComponent
  },
  {
    path: 'proyecto/edit/:id',
    component: ProyectoEditComponent
  },
  {
    path: 'cambio/edit/:id',
    component: MonedaEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
