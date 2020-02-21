import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
       
      },
      {
        path: 'catalogo',
        loadChildren: () => import('./catalogos/catalogos.module').then(m => m.CatalogosModule)
      },
      {
        path: 'proforma',
        loadChildren: () => import('./proforma/proforma.module').then(m => m.ProformaModule)
      }
    ]
  },
  {
    path: 'admin',
    /* canActivate: [AuthGuard], */
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
