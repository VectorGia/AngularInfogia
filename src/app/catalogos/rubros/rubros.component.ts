import { Component, OnInit } from '@angular/core';
import { RubroService } from 'src/app/core/service/rubro.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogOverviewDialogComponent } from 'src/app/shared/dialog-overview-dialog/dialog-overview-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageComponent } from 'src/app/shared/message/message.component';
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'clave', 'cuenta', 'monto','aritmetica','action'];
  dataSource: any
  id: any;
  rubros = [];
  durationInSeconds = 6;
 name: any;
  constructor(private rS: RubroService, private aR: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      this.name = params.nombre
      console.log("nombre: ", params)
      console.log("ID: ",this.id)
      this.rS.getRubroByModeloId(this.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        if(this.dataSource.data.length === 0){
          this.openSnackBar();
        }
        console.log("datos",this.dataSource.data);
      })
    })
  }
  return(){
    this.router.navigate(['./catalogo/negocio'])
   }

   openDialog(): void {
    console.log("negocio... ")
    const dialogRef = this.dialog.open(DialogOverviewDialogComponent,{
      disableClose: true,
      width: '550px',
      data: {
        id: this.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteRubro(id){
    this.rS.deleteRubro(id).subscribe(res => {
      this.ngOnInit();
    });
  }

  openSnackBar(){
    this._snackBar.openFromComponent(MessageComponent, {
      duration: this.durationInSeconds * 1000
    });
  }
}
