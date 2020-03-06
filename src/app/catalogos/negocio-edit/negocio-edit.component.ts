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
  id: string
  constructor(private cS: CompaniaService,
              private fb: FormBuilder,
              private router: Router,
              private nS: NegocioService,
              private aR: ActivatedRoute,
              private unidadService: UnidadnegocioService) {
    this.buildForm();
    this.fetchUnidad();
  }

  ngOnInit() {
   this.fetchEmpresa();
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id);
      this.nS.getModelo(this.id)
        .subscribe(data => {
          console.log("data", data)
          this.modelo.patchValue(data)
        })
    })
  }

  saveModelo(event: Event){
    event.preventDefault();
    if(this.modelo.valid){
      const centro = this.modelo.value;
      this.nS.updateModelo(this.id, centro )
      .subscribe((newCompania) => {
        console.log(newCompania);
        this.router.navigate(['./catalogo/negocio'])
      });
    }
  }

  fetchEmpresa() {
    this.cS.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      console.log(compania);
    });
  }
  fetchUnidad() {
    this.unidadService.getAllUnidades()
      .subscribe(uni => {
        this.unidades = uni;
        console.log('Unodades de Negocio: ', uni);
      });
    }
    buildForm() {
    this.modelo = this.fb.group({
      nombre: [null, Validators.required],
      unidad_negocio_id: [''],
    });
  }
  return() {
    this.router.navigate(['./catalogo/negocio'])
   }
}
