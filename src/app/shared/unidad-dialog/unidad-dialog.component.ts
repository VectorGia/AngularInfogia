import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UnidadnegocioService } from 'src/app/core/service/unidadnegocio.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NegocioService } from 'src/app/core/service/negocio.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-unidad-dialog',
  templateUrl: './unidad-dialog.component.html',
  styleUrls: ['./unidad-dialog.component.css']
})
export class UnidadDialogComponent implements OnInit {
  unidades: any;
  unidadF: FormGroup;
  constructor( private unidadService: UnidadnegocioService,
               private ns: NegocioService,
               private fb: FormBuilder,
               private dialogRef: MatDialogRef<UnidadDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.fetchUnidad();
               }

  ngOnInit() {
    this.buildModelo();
  }

  buildModelo() {
    this.unidadF = this.fb.group({
      unidad_negocio_id: ['', Validators.required],
      activo: [true]
    });
  }
  fetchUnidad() {
    this.unidadService.getAllUnidades()
    .subscribe(uni => {
      this.unidades = uni;
      console.log('Unodades de Negocio: ', uni);
    });
  }

  saveUnidad(form: NgForm) {
    this.ns.addModeloUnidad(form)
    .subscribe( res => {
      Swal.fire(
        'Listo!',
        'Se guardo el modelo!',
        'success'
      );
    })
  }
}
