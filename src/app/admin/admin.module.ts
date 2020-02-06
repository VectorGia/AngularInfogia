import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { GroupComponent } from './components/group/group.component';
import { RolComponent } from './components/rol/rol.component';

import { StartComponent } from './components/start/start.component';
import { RelacionComponent } from './components/relacion/relacion.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { LoginComponent } from './components/login/login.component';




@NgModule({
  declarations: [NavComponent, UserComponent, GroupComponent, RolComponent, StartComponent, RelacionComponent, PermisosComponent, UserEditComponent, GroupEditComponent, LoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
   
  ]
})
export class AdminModule { }