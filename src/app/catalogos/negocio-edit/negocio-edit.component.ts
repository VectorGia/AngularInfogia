import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { Negocio } from 'src/app/core/models/negocio';
import { CompaniaService } from 'src/app/core/service/compania.service';
import {UnidadnegocioService} from '../../core/service/unidadnegocio.service';
import { MatTableDataSource } from '@angular/material';
import Swal from "sweetalert2";

@Component({
  selector: 'app-negocio-edit',
  templateUrl: './negocio-edit.component.html',
  styleUrls: ['./negocio-edit.component.css']
})
export class NegocioEditComponent implements OnInit {
  displayedColumns: string[] = ['unidad'];
  dataSource: any;
  modelo: FormGroup;
  negocio: Negocio[];
  companias = [];
  unidades: any;
  unidad: any;
  id: any;
  nombre: any;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private nS: NegocioService,
              private aR: ActivatedRoute,
              private unidadService: UnidadnegocioService) {
    this.buildForm();
    this.fetchUnidad();
  }

  ngOnInit() {
   this.aR.params.subscribe((params) => {
      this.id = params.id;
      this.nombre = params.nombre;

      console.log(this.id);
    });
  }

  saveModelo(event: Event) {
    event.preventDefault();
    if (this.modelo.valid) {
      const centro = this.modelo.value;
      this.nS.updateModelo(this.id, centro )
      .subscribe((newCompania) => {
        console.log(newCompania);
        Swal.fire(
          'Listo',
          'Modelo actualizado',
          'success'
        );
        this.router.navigate(['./catalogo/negocio' + this.getData(window.location.href, 'negocio/', '/edit')]);
      });
    }else{
      Swal.fire(
        'Atención!',
        'Complete la información requerida',
        'warning'
      );
      return false;
    }
  }

  getData(url, startDelimiter, endDelimiter) {
    let idxIni = url.indexOf(startDelimiter);
    idxIni = idxIni + startDelimiter.length;
    const idxFin = url.indexOf(endDelimiter);
    if (idxFin === -1) {
        return url.substring(idxIni);
    } else {
        return url.substring(idxIni, idxFin);
    }
}
  fetchUnidad() {
    console.log('[id]: ', this.id);
    this.unidadService.getAllUnidades()
      .subscribe(allUnidades => {
        this.unidadService.getUnidadesById(this.id)
        .subscribe(unidadesModelo => {
          console.log('unidadesModelo', unidadesModelo);
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = unidadesModelo;
          let tmp = {nombre: unidadesModelo[0].descripcionModelo}
          this.modelo.patchValue(tmp);
        });
        this.unidades = allUnidades;
        console.log('Unodades de Negocio: ', allUnidades);
      });
    }
    buildForm() {
    this.modelo = this.fb.group({
      nombre: [''],
      unidades_negocio_ids: [''],
    });
  }
  return() {
    this.router.navigate(['./catalogo/negocio'])
   }
}
