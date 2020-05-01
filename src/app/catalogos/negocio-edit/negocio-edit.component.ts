import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { Negocio } from 'src/app/core/models/negocio';
import { CompaniaService } from 'src/app/core/service/compania.service';
import {UnidadnegocioService} from '../../core/service/unidadnegocio.service';

@Component({
  selector: 'app-negocio-edit',
  templateUrl: './negocio-edit.component.html',
  styleUrls: ['./negocio-edit.component.css']
})
export class NegocioEditComponent implements OnInit {
  modelo: FormGroup;
  negocio: Negocio[];
  companias = [];
  unidades: any;
  id: any;
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
        this.router.navigate(['./catalogo/negocio']);
      });
    }
  }

  fetchUnidad() {
    console.log('[id]: ', this.id);
    this.unidadService.getAllUnidades()
      .subscribe(allUnidades => {
        this.unidadService.getUnidadesById(this.id)
        .subscribe(unidadesModelo => {
          console.log('data', unidadesModelo);
          this.modelo.patchValue(unidadesModelo[0]);
          for (let i = 0; i < allUnidades.length; i++){
            for (let j = 0; j < unidadesModelo.length; j++) {
              if (unidadesModelo[j].idUnidad === allUnidades[j].id) {
                 allUnidades[j].selected = true;
              }
            }
          }
        });
        this.unidades = allUnidades;
        console.log('Unodades de Negocio: ', allUnidades);
      });
    }
    buildForm() {
    this.modelo = this.fb.group({
      descripcionModelo: ['', Validators.required],
      idUnidad: [''],
    });
  }
  return() {
    this.router.navigate(['./catalogo/negocio'])
   }
}
