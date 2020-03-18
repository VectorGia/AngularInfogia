import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DialogOverviewDialogComponent } from './dialog-overview-dialog/dialog-overview-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [ConfirmationDialogComponent, DialogOverviewDialogComponent, LoaderComponent, LoadingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
    exports: [
        ConfirmationDialogComponent,
        LoaderComponent,
        LoadingComponent
    ],
  entryComponents: [
    ConfirmationDialogComponent,
    DialogOverviewDialogComponent
  ]
})
export class SharedModule { }
