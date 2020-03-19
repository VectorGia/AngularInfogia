import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { CentroCostosComponent } from './centro-costos/centro-costos.component';
import { CentroCostosEditComponent } from './centro-costos-edit/centro-costos-edit.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';
import { MonedaComponent } from './moneda/moneda.component';
import { MonedaEditComponent } from './moneda-edit/moneda-edit.component';
import { NegocioComponent } from './negocio/negocio.component';
import { NegocioEditComponent } from './negocio-edit/negocio-edit.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectoEditComponent } from './proyecto-edit/proyecto-edit.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RubrosComponent } from './rubros/rubros.component';
import { RubrosEditComponent } from './rubros-edit/rubros-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CentroCostosComponent,
                CentroCostosEditComponent,
                EmpresaComponent,
                EmpresaEditComponent,
                MonedaComponent,
                MonedaEditComponent,
                NegocioComponent, NegocioEditComponent, ProyectoComponent, ProyectoEditComponent, RubrosComponent, RubrosEditComponent],
  imports: [
    CommonModule,
    CatalogosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CatalogosModule { }
