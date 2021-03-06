import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RubroService} from 'src/app/core/service/rubro.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-rubros-edit',
  templateUrl: './rubros-edit.component.html',
  styleUrls: ['./rubros-edit.component.css']
})
export class RubrosEditComponent implements OnInit {
  editRubro: FormGroup;
  id: string;
  rubros: any;
  disabledC = true;
  disabledR = true;
  nombreTipoCaptura = '';
  labelCtaOrTm  = '';
  hijos: any ;

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
              private rubroService: RubroService,
              private router: Router) {
    const data =  decodeURI(this.getData(window.location.href, 'rubros/', '/edit')).split('|');
    if (data.length > 1) {
      this.nombreTipoCaptura = data[1];
      this.labelCtaOrTm = this.nombreTipoCaptura === 'FLUJO' ? 'TMs' : 'Cuentas';
    }
    this.buildEditForm();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      console.log(`id rubros: ${this.id}`);
      this.rubroService.getRubroById(this.id)
        .subscribe(data => {
          console.log('data: ', data);
          if (data[0].aritmetica !== '') {
            this.disabledC = false;
            this.disabledR = true;
          } else {
            this.disabledR = false;
            this.disabledC = true;
          }
          this.getRubros(data[0].id_modelo_neg);
          const hijosActuales = data[0].hijos;
          this.hijos = hijosActuales;
          if (hijosActuales) {
            data[0].hijos = hijosActuales.split(',');
            const hijosNumericos = [];
            data[0].hijos.forEach(hijo => {
              hijosNumericos.push(parseInt(hijo, 10));
            });
            data[0].hijos = hijosNumericos;
            console.log('data hijos manejados: ', data);
          }
          this.editRubro.patchValue(data[0]);
        });
    });

  }

  buildEditForm() {
    this.editRubro = this.formBuilder.group({
      nombre: [null, Validators.required],
      clave: ['', Validators.required],
      rangos_cuentas_incluidas: [''],
      rango_cuentas_excluidas: [''],
      hijos: [''],
      tipo_cuenta: [''],
      aritmetica: [''],
      naturaleza: [''],
      es_total_ingresos: [false]
    });
  }

  getRubros(id_modelo_neg) {
    console.log('buscar id: ', id_modelo_neg);
    this.rubroService.getRubroByModeloId(id_modelo_neg)
      .subscribe(datos => {
        this.rubros = datos;
        console.log('rubro id: ', this.rubros);
      });
  }

  return() {
    this.router.navigate(['./catalogo/negocio/rubros/' + decodeURI(this.getData(window.location.href, 'rubros/', '/edit'))]);
  }

  saveEdit(event: Event) {
    event.preventDefault();
    if (this.editRubro.valid) {
      const rubro = this.editRubro.value;
      this.rubroService.updateRubro(this.id, rubro)
        .subscribe((newRubro) => {
          this.router.navigate(['./catalogo/negocio/rubros/' + decodeURI(this.getData(window.location.href, 'rubros/', '/edit'))]);
        }, error => {
          Swal.fire(
            'Atención',
            'Ocurrió un error. Causa: ' + error['error'],
            'error'
          );
        });
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
}
