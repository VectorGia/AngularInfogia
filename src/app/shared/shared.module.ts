import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DialogOverviewDialogComponent } from './dialog-overview-dialog/dialog-overview-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LoadingComponent } from './loading/loading.component';
import { CronComponent } from './cron/cron.component';
import { CronEditorModule } from 'projects/cron-editor/src/lib/cron-editor.module';
// import { CronEditorModule } from 'ngx-cron-editor';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConfirmationDialogComponent, DialogOverviewDialogComponent, LoaderComponent, LoadingComponent, CronComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    CronEditorModule,
    FormsModule,
  ],
    exports: [
        ConfirmationDialogComponent,
        LoaderComponent,
        LoadingComponent,
        CronComponent,
    ],
  entryComponents: [
    ConfirmationDialogComponent,
    DialogOverviewDialogComponent,
  ]
})
export class SharedModule { }
