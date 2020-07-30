import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {NegocioService} from 'src/app/core/service/negocio.service';
import {RubroService} from 'src/app/core/service/rubro.service';
import {ActivatedRoute} from '@angular/router';
import {RubroNode} from 'src/app/core/models/rubronode';
import Swal from 'sweetalert2';

const TREE_DATA: RubroNode[] = [];

@Component({
  selector: 'app-dialog-overview-dialog',
  templateUrl: './dialog-overview-dialog.component.html',
  styleUrls: ['./dialog-overview-dialog.component.css']
})

export class DialogOverviewDialogComponent implements OnInit {
  cuentasForm: FormGroup;
  modelos: any;
  select: boolean;
  id: string;
  nombre: any;
  clave: any;
  cuentainclu: any;
  cuentaexclu: any;
  aritmetica: any;
  rubros: any;
  labelCtaOrTm = '';
  nombreTipoCaptura = '';


  disableSelect = new FormControl(false);

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogOverviewDialogComponent>,
              private ns: NegocioService,
              private rS: RubroService,
              private aR: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nombreTipoCaptura = data.nombreTipoCaptura;
    this.labelCtaOrTm = data.nombreTipoCaptura === 'FLUJO' ? 'TMs' : 'Cuentas';
    this.buildCuenta();
  }

  ngOnInit() {
    this.fetchRubros();

  }

  buildCuenta() {
    this.cuentasForm = this.fb.group({
      id_modelo_neg: [this.data.id, Validators.required],
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      rangos_cuentas_incluidas: ['', Validators.required],
      rango_cuentas_excluidas: [''],
      aritmetica: ['', Validators.required],
      tipo_agrupador: ['', Validators.required],
      tipo_cuenta: [''],
      hijos: ['', Validators.required],
      activo: [true],
      tipo_id: ['2', Validators.required],
      naturaleza: ['ACREEDORA', Validators.required],
      es_total_ingresos: [false]
    });
  }

  fetchRubros() {
    this.rS.getRubroByModeloId(this.data.id)
      .subscribe(res => {
        this.rubros = res;
        console.log('rubros: ', this.rubros);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  opc() {
    this.select = false;
  }

  opcr() {
    this.select = true;
  }


  onSubmit() {
    if (this.cuentasForm.valid) {
      console.log('Form Submitted');
      this.cuentasForm.reset();
    }
  }

  existClaveIn(rubros, clave) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < rubros.length; i++) {
      if (rubros[i].clave === clave) {
        return true;
      }
    }
    return false;
  }

  existAgrupador(rubros, agrupador) {
    for (let i = 0; i < rubros.length; i++) {
      if (rubros[i].tipo_agrupador === agrupador) {
        return true;
      }
    }
    return false;
  }

  saveRubro(form: any) {
    if ( form.clave.length !== 4) {
      this.alertar('La longitud de la clave deber ser de 4 caracteres');
    } else {
      if (form.aritmetica) {
        this.rS.getRubroByModeloId(this.data.id).subscribe(res => {
          const rubros = res;
          console.log('Datos obtenidos por id: ', rubros);
          if (this.existClaveIn(rubros, form.clave)) {
            this.alertar('Ya existe un rubro con la clave ' + form.clave + ' favor de verificar.');
            return;
          }
          if (!this.disableSelect) {
            if (this.existAgrupador(rubros, form.tipo_agrupador)) {
              this.alertar('Ya existe un agrupador de ' + form.tipo_agrupador + ' favor de verificar.');
              return;
            }
          }
          const msg = this.isValidExpresion({aritmetica: form.aritmetica}, rubros);
          if (msg) {
            this.alertar(msg);
          } else {
            // tslint:disable-next-line: no-shadowed-variable
            this.rS.postRubro(form).subscribe(res => {
              const nombre = res.nombre;
              this.onNoClick();
              this.ngOnInit();
            }, error => {
              this.alertar('Ocurrió un error en la operación. Causa:' + error.error);
            });
          }
        });
      } else {
        this.rS.getRubroByModeloId(this.data.id).subscribe(res => {
          const rubros = res;
          if (this.existClaveIn(rubros, form.clave)) {
            this.alertar('Ya existe un rubro con la clave ' + form.clave + ' favor de verificar.');
            return;
          }
          // tslint:disable-next-line: no-shadowed-variable
          this.rS.postRubro(form).subscribe(res => {
            const nombre = res.nombre;
            console.log('nombre', nombre);
            this.onNoClick();
            this.ngOnInit();
          }, error => {
            this.alertar('Ocurrio un error en la operación. Causa:' + error.message);
          });
        });
      }
    }
  }


  isValidExpresion(rubroRubros, rubrosCtas) {
    const evaluacion = this.isValid(rubrosCtas, rubroRubros);
    if (!evaluacion.resultado) {
      return 'Arimética \'' + rubroRubros.aritmetica + '\' es inválida. Causa:[' + evaluacion.mensaje + ']';
    }

    return '';
  }

  getRubros(rubros, claveTipo) {
    const rubrosTipo = [];
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < rubros.length; i++) {
      const rubroCtas = rubros[i];
      if (rubroCtas.tipo.clave === claveTipo) {
        rubrosTipo.push(rubroCtas);
      }
    }
    return rubrosTipo;
  }

  isValid(rubrosCtas, rubroRubros) {
    const cvesInAritmetica = this.getUnique(rubroRubros.aritmetica.match(/[A-Za-z]+/g));
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cvesInAritmetica.length; i++) {
      const clave = cvesInAritmetica[i];
      if (!this.findRubroByClave(rubrosCtas, clave)) {
        return {resultado: false, mensaje: 'No se encontro el rubro \'' + clave + '\' especificado en aritmética, dentro de los rubros'};
      }
    }
    try {
      // tslint:disable-next-line: no-eval
      eval(rubroRubros.aritmetica.replace(/\w+/g, '1'));
    } catch (e) {
      console.error(e);
      return {resultado: false, mensaje: 'Error de evaluación'};
    }
    return {resultado: true, mensaje: ''};

  }

  findRubroByClave(rubros, clave) {
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < rubros.length; i++) {
      if (rubros[i].clave === clave) {
        return rubros[i];
      }
    }
  }

  getUnique(array) {
// tslint:disable-next-line: prefer-const
    let uniqueArray = [];

// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  alertar(msg) {
    Swal.fire(
      'Aviso',
      msg,
      'warning'
    );
  }


}
