import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrosService } from 'src/app/core/service/centros.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { NegocioService } from 'src/app/core/service/negocio.service';

@Component({
  selector: 'app-centro-costos-edit',
  templateUrl: './centro-costos-edit.component.html',
  styleUrls: ['./centro-costos-edit.component.css']
})
export class CentroCostosEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  companias: any;
  modelos: any;
  
  selected = false;
  constructor(private aR: ActivatedRoute, private companiaService: CompaniaService,
              private fB: FormBuilder, private cS: CentrosService, private router: Router,
              private modeloService: NegocioService) {
    this.builForm();
    this.fetchCompania();
    this.fetchModelos();
  }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      console.log("aqui", params.id);
      this.cS.getCC(this.id)
        .subscribe(product => {
          console.log('product: ', product);

          this.form.patchValue(product);
        })
    })
  }
  return(){
    let idProyecto=this.getIdProyecto(window.location.href);
    this.router.navigate(['./catalogo/costos/' + idProyecto])
   }
  saveCentro(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const centro = this.form.value;
      this.cS.updateCentro(this.id, centro)
      .subscribe((newCentro) => {
        console.log(newCentro);
        let idProyecto=this.getIdProyecto(window.location.href);
        this.router.navigate(['./catalogo/costos/' + idProyecto])
      })
    }
  }

  private builForm(){
    
    this.form = this.fB.group({
  
      tipo: [null, Validators.required],
      desc_id: [null, Validators.required],
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      estatus: [null, Validators.required],
      gerente: [null, Validators.required],
      empresa_id: [null, Validators.required],
      modelo_negocio_id: ['', Validators.required],
      porcentaje: [''],
      proyeccion: ['']
    })
  }
  fetchCompania(){
    this.companiaService.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      console.log("compañias", this.companias);
    })
  }

  fetchModelos() {
    this.modeloService.getAllModelos()
    .subscribe( res => {
      this.modelos = res;
      console.log('modelos-edit: ', this.modelos);
    });
  }
   getIdProyecto(url){
      var inicioCad="costos/";
      var idxIni=url.indexOf(inicioCad);
      idxIni = idxIni+inicioCad.length;
      var idxFin = url.indexOf("/", idxIni);
      var idProyecto;
      if(idxFin === -1){
          idProyecto = url.substring(idxIni);
      } else {
          idProyecto = url.substring(idxIni,idxFin);
      }
      return idProyecto;
  }
  selec() {
    this.selected = false;
  }
  select() {
    this.selected = true;
  }
}
