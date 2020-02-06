import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { RelacionComponent } from './components/relacion/relacion.component';
import { RolComponent } from './components/rol/rol.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupComponent } from './components/group/group.component';
import { UserComponent } from './components/user/user.component';
import { StartComponent } from './components/start/start.component';
import { NavComponent } from './components/nav/nav.component';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: StartComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'group/edit/:id',
        component: GroupEditComponent
      },
      {
        path: 'user/edit/:id',
        component: UserEditComponent
      },
      {
        path: 'rol',
        component: RolComponent
      },
      {
        path: 'relacion',
        component: RelacionComponent
      },
      {
        path: 'permiso',
        component: PermisosComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
