import { Component, OnInit, ViewChild } from '@angular/core';
import { CentrosService } from 'src/app/core/service/centros.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { EmpresaProyectoService } from 'src/app/core/service/empresa-proyecto.service';
import { NegocioService } from 'src/app/core/service/negocio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centro-costos',
  templateUrl: './centro-costos.component.html',
  styleUrls: ['./centro-costos.component.css']
})
export class CentroCostosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'estatus', 'gerente', 'idempresa', 'idproyecto', 'actions'];
  dataSource: any;
  centroForm: FormGroup;
  companias: any;
  centros: any;
  proyectoId: any;
  modelos: any;
  selected = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cs: CentrosService,
              private fb: FormBuilder,
              private companiaService: CompaniaService,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private empresaproService: EmpresaProyectoService,
              private modeloService: NegocioService) {

  }

  ngOnInit() {
    // this.array.paginator = this.paginator;
    this.activeRoute.params.subscribe((params) => {
      this.proyectoId = params.proyectoId;
      console.log('ID Proyecto:', this.proyectoId);
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
    });
    this.renderDataTable();
    this.fetchModelos();
    this.buildCentro();
  }

  buildCentro() {
    this.centroForm = this.fb.group({
      tipo: ['local', Validators.required],
      desc_id: [null, Validators.required],
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      estatus: [null, Validators.required],
      gerente: [null, Validators.required],
      proyecto_id: [this.proyectoId],
      empresa_id: ['', Validators.required],
      proyeccion: ['BASE', Validators.required],
      porcentaje: [100],
      modelo_negocio_id: ['', Validators.required],
      activo: [true]
    });
  }
  renderDataTable() {
    this.cs.getCentro(this.proyectoId)
    .subscribe(
      x => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = x;
        console.log('cc: ', this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros' + error);
      });
  }

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  selec() {
    this.selected = false;
  }
  select() {
    this.selected = true;
  }
  onFormSubmit(form: NgForm) {

    this.cs.addCentro(form).subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const id = res['STR_IDCENTROCOSTO'];
        Swal.fire(
          'Listo',
          'Se guardo el Centro de Costos',
          'success'
        )
        this.renderDataTable();
      });
  }

 delete(id) {
   this.cs.deleteCentro(id).subscribe(
     (res) => {
      this.renderDataTable();
     }
   );
 }
 openDialog(id): void {
   const swalWithBootstrapButtons = Swal.mixin({
     customClass: {
       confirmButton: 'btn btn-success',
       cancelButton: 'btn btn-danger'
     },
     buttonsStyling: false
   });

   swalWithBootstrapButtons.fire({
     title: '¿Estás seguro de eliminar el centro de costos?',
     text: 'No podrás deshacer este cambio',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Si, eliminar',
     cancelButtonText: 'No, cancelar',
     reverseButtons: true
   }).then((result) => {
     if (result.value) {
       this.delete(id);
       swalWithBootstrapButtons.fire(
         'Eliminado',
         'El centro de costos se ha borrado.',
         'success'
       );
     }
   });
}

fetchModelos() {
  this.modeloService.getAllModelos()
  .subscribe( res => {
    this.modelos = this.restringirModelos(res);
    console.log('modelos: ', this.modelos);
  });
}

  restringirModelos(modelos) {
    const nombresModelo = {};
    for (const modelo of modelos) {
       if (! nombresModelo[modelo.nombre]) {
         nombresModelo [modelo.nombre] = modelo;
       }
    }
    return Object.values(nombresModelo);
  }
}
