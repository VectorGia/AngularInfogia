import { Component, OnInit, ViewChild } from '@angular/core';
import { CentrosService } from 'src/app/core/service/centros.service';
import { CentroCostos } from 'src/app/core/models/centro.model';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { EmpresaProyectoService } from 'src/app/core/service/empresa-proyecto.service';
import { isNull } from 'util';
import { NegocioService } from 'src/app/core/service/negocio.service';

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
  id: any;
  modelos: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cs: CentrosService,
              private fb: FormBuilder,
              private router: Router,
              private companiaService: CompaniaService,
              public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private empresaproService: EmpresaProyectoService,
              private modeloService: NegocioService) {

  }

  ngOnInit() {
    // this.array.paginator = this.paginator;
    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      console.log('ID Proyecto:', this.id);
      this.empresaproService.getEmpresas(this.id)
        .subscribe(companias => {
          if (companias.length > 0 ) {
            console.log(companias);
            this.companias = companias;
          } else {
            this.companiaService.getAllCompania()
            // tslint:disable-next-line: no-shadowed-variable
            .subscribe(companias => {
              this.companias = companias;
            });
          }
          console.log('compañias listadas', this.companias);
      });
    });
    this.renderDataTable();
    this.fetchModelos();
    this.centroForm = this.fb.group({
      tipo: [null, Validators.required],
      desc_id: [null, Validators.required],
      nombre: [null, Validators.required],
      categoria: [null, Validators.required],
      estatus: [null, Validators.required],
      gerente: [null, Validators.required],
      proyecto_id: [this.id],
      empresa_id: ['', Validators.required],
      modelo_negocio_id: ['', Validators.required],
      activo: [true]
    });
  }

  renderDataTable() {
    this.cs.getCentro(this.id)
    .subscribe(
      x => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = x;
        console.log('cc: ', this.dataSource.data);
      },
      error => {
        console.log('Error al extraer los registros!' + error);
      });
  }

 applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    /* this.array.filter = filterValue.trim().toLowerCase();
    if (this.array.paginator) {
      this.array.paginator.firstPage();
    } */
  }
  onFormSubmit(form: NgForm) {

    this.cs.addCentro(form).subscribe(
      res => {
        // tslint:disable-next-line: no-string-literal
        const id = res['STR_IDCENTROCOSTO'];
        this.centroForm.reset();
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
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '550px',
    data: 'Esta seguro de eliminar este grupo?'
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Yes clicked');
      this.delete(id);
      // DO SOMETHING
    }
  });
}

fetchModelos() {
  this.modeloService.getAllModelos()
  .subscribe( res => {
    this.modelos = res;
    console.log('modelos: ', this.modelos);
  });
}
}
