import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CentrosService } from 'src/app/core/service/centros.service';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { NegocioService } from 'src/app/core/service/negocio.service';
import {EmpresaProyectoService} from '../../core/service/empresa-proyecto.service';

@Component({
  selector: 'app-centro-costos-edit',
  templateUrl: './centro-costos-edit.component.html',
  styleUrls: ['./centro-costos-edit.component.css']
})
export class CentroCostosEditComponent implements OnInit {
  form: FormGroup;
  centroId: string;
  proyectoId: string;
  companias: any;
  modelos: any;

  selected = false;
  constructor(private aR: ActivatedRoute, private companiaService: CompaniaService,
              private fB: FormBuilder, private cS: CentrosService, private router: Router,
              private modeloService: NegocioService,
              private empresaproService: EmpresaProyectoService) {
    this.builForm();
   // this.fetchCompania();
    this.fetchModelos();
  }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      this.centroId = params.centroId;
      this.proyectoId = params.proyectoId;

      this.cS.getCC(this.centroId)
        .subscribe(product => {
          console.log('product: ', product);

          this.form.patchValue(product);
        });
      this.fetchCompania();
    });
  }
  regresar() {
    // let idProyecto = this.getIdProyecto(window.location.href);
    this.router.navigate(['./catalogo/costos/' + this.proyectoId]);
   }
  saveCentro(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const centro = this.form.value;
      this.cS.updateCentro(this.centroId, centro)
      .subscribe((newCentro) => {
        console.log(newCentro);
        // let idProyecto=this.getIdProyecto(window.location.href);
        this.router.navigate(['./catalogo/costos/' + this.proyectoId]);
      });
    }
  }

  private builForm() {

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
    });
  }
  fetchCompania() {
  /*  this.companiaService.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      // console.log("compañias", this.companias);
    });
*/
    this.empresaproService.getEmpresas(this.proyectoId)
      .subscribe(companias => {
        if (companias.length > 0 ) {
          console.log(companias);
          this.companias = companias;
        } else {
          this.companiaService.getAllCompania()
            .subscribe( result => {
              this.companias = result;
            });
        }
        console.log('compañias listadas', this.companias);
      });
  }

  fetchModelos() {
    this.modeloService.getAllModelos()
    .subscribe( res => {
      this.modelos = res;
      console.log('modelos-edit: ', this.modelos);
    });
  }
  /* getIdProyecto(url){
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
  }*/
  selec() {
    this.selected = false;
  }
  select() {
    this.selected = true;
  }
}
