import {Component, OnInit} from '@angular/core';
import {RubroService} from 'src/app/core/service/rubro.service';
import {MatTableDataSource} from '@angular/material/table';
import {Router, ActivatedRoute} from '@angular/router';
import {DialogOverviewDialogComponent} from 'src/app/shared/dialog-overview-dialog/dialog-overview-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from "sweetalert2";


@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'clave', 'naturaleza', 'cuenta', 'monto', 'aritmetica', 'action'];
  dataSource: any;
  id: any;

  rubros: any;
  durationInSeconds = 6;
  name: string;
  nombreTipoCaptura: string = '';
  labelCtaOrTm: string = '';

  constructor(private rS: RubroService, private aR: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private fb: FormBuilder,
              // tslint:disable-next-line: variable-name
              private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      console.log('rubros component params: ', params);
      this.id = params.id;
      let data = decodeURI(params.nombre).split('|');
      this.name = data[0];
      if (data.length > 1) {
        this.nombreTipoCaptura = data[1];
        this.labelCtaOrTm = this.nombreTipoCaptura === 'FLUJO' ? 'TMs' : 'Cuentas';
      }

      console.log('ID: ', this.id);
      this.rS.getRubroByModeloId(this.id)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource();
          console.log('antes: ', data);
          this.dataSource.data = this.reorderRubros(data);
          console.log('datos', this.dataSource.data);
        });
    });
  }

  return() {
    this.router.navigate(['./catalogo/negocio']);
  }

  openDialog(): void {
    console.log('negocio... ');
    const dialogRef = this.dialog.open(DialogOverviewDialogComponent, {
      disableClose: true,
      width: '550px',
      position: {
        top: '0',
        right: '0'
      },
      data: {
        id: this.id,
        nombreTipoCaptura : this.nombreTipoCaptura
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  deleteRubro(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de eliminar el rubro?',
      text: 'No podrás deshacer este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.rS.deleteRubro(id).subscribe(res => {
          this.ngOnInit();
        });
      }
    });
  }

// reorderRubros(rubros)

  reorderRubros(rubros) {
    console.log('recibi rubros: ', rubros);
    rubros.forEach(rubro => {
      rubro.estilo = 'defecto';
    });
    const rubrosReorder = [];
    const padres = this.getPadres(rubros);
    const padresSinHijos = [];
    for (const padre of padres) {
      padre.estilo = padre.es_total_ingresos ? 'padreingresos' : 'padre';
      if (!padre.hijos) {
        padresSinHijos.push(padre);
        continue;
      }
      rubrosReorder.push(padre);
      const hijos = this.getHijos(padre, rubros);
      for (const hijo of hijos) {
        hijo.estilo = 'hijo';
        rubrosReorder.push(hijo);
      }
    }

    for (const padreSinHijos of padresSinHijos) {
      if ( padreSinHijos.es_total_ingresos) {
        rubrosReorder.unshift(padreSinHijos);
      } else {
        rubrosReorder.push(padreSinHijos);
      }
    }
    for (const rreodered of rubrosReorder) {
      const idx = rubros.indexOf(rreodered);
      if ( idx >= 0) {
        rubros.splice(idx, 1);
      }
    }
    const res = rubrosReorder.concat(rubros);
    console.log('reorden:', res);
    return res;
  }

  getPadres(rubros) {
    const padres = [];
    const ponderacion = { default: -1, egreso: 0, ingreso: 1, tingreso: 2};
    for (let i = 0; i < rubros.length; i++) {
      const actual = rubros[i];
      if (actual.hijos || actual.aritmetica) {
        padres.push(actual);
      }
    }
    padres.sort((a, b) => {
      return a.id - b.id;
    });
    padres.sort((a, b) => {

      let aValorPonderado = ponderacion[a.tipo_agrupador ? a.tipo_agrupador : 'default'];
      let bValorPonderado = ponderacion[b.tipo_agrupador ? b.tipo_agrupador : 'default'];
      if ( a.es_total_ingresos) {
        aValorPonderado = ponderacion['tingreso'];
      }
      if ( b.es_total_ingresos) {
        bValorPonderado = ponderacion['tingreso'];
      }

      return bValorPonderado - aValorPonderado;
    });
    return padres;
  }

  getHijos(padre, rubros) {
    const hijos = [];
    if (padre.hijos) {
      const arrhijos = padre.hijos.split(',');
      for (var i = 0; i < arrhijos.length; i++) {
        const found = this.findById(rubros, arrhijos[i].trim());
        if (found) {
          hijos.push(found);
        }
      }
    }
    return hijos;
  }

  findById(rubros, id) {
    for (let i = 0; i < rubros.length; i++) {
      const actual = rubros[i];
      if (actual.rubro_id) {
        if (actual.rubro_id == id) {
          return actual;
        }
      } else {
        if (actual.id == id) {
          return actual;
        }
      }
    }
    return null;
  }
}
