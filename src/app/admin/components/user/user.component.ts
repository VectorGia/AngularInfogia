import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from './../../../shared/confirmation-dialog/confirmation-dialog.component'
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'usuario', 'puesto', 'correo', 'accion'];
  dataSource: any;
  hide = true;
  userForm: FormGroup;
  id: string;
  constructor(private fb: FormBuilder, private uS: UsuarioService, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit() {
    this.getUsuarios();
  }

  addUsuario(form: NgForm){
    this.uS.postUsuario(form).subscribe(
      res => {
        let STR_NOMBRE_USUARIO = res['STR_NOMBRE_USUARIO']
        alert("Guardado con exito");
      }
    )
  }

  buildForm(){
    this.userForm = this.fb.group({
      STR_NOMBRE_USUARIO: ['', Validators.required],
      STR_USERNAME_USUARIO: ['', Validators.required],
      STR_PUESTO: ['', Validators.required],
      STR_EMAIL_USUARIO: ['', Validators.required, Validators.email],
      BOOL_ESTATUS_LOGICO_USUARIO: [true],

    })
  }


  getUsuarios(){
    this.uS.getAllUsuarios()
    .subscribe(user => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = user;
      console.log(this.dataSource.data)
    },
    error => {
      console.log('Error al obtener los registros', error)
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    /* this.array.filter = filterValue.trim().toLowerCase();
    if (this.array.paginator) {
      this.array.paginator.firstPage();
    } */
  }

  delete(id){

    this.uS.deleteUsuario(id).subscribe(
      res => {

        this.getUsuarios();
      }
    )
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '550px',
      data: "Esta seguro de eliminar este usuario?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.delete(id)
        // DO SOMETHING
      }
    });
  }
}
