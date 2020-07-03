import { Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { ProyectoService } from 'src/app/core/service/proyecto.service';
import { ConfirmationDialogComponent } from './../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'responsable', 'empresa', 'action'];
  dataSource: any;
  proyectoForm: FormGroup;
  companias: any;
  modelos: any;
  constructor(private ps: ProyectoService, private fb: FormBuilder, public dialog: MatDialog,
              private cS: CompaniaService) {
    this.proyectoForm = this.fb.group({
      nombre: ['', Validators.required],
      responsable: ['', Validators.required],
      desc_id: ['', Validators.required],
      estatus: ['', Validators.required],
      activo: [true, Validators.required],
      idsempresas: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProjects();
    this.fetchCompania();
  }

  getProjects() {
    this.ps.getAllProyecto()
    .subscribe(data => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    },
    error => {
      console.log('Error al obtener los registros!', error);
    });
  }
  delete(id) {
    this.ps.deleteProyecto(id).subscribe(
      (data) => {
        this.ngOnInit();
      });
  }
  saveProyecto(form: NgForm) {
    this.ps.addProyecto(form).subscribe(
      res => {
        Swal.fire(
          'Listo!',
          'Se guardo el proyecto!',
          'success'
        );
        this.ngOnInit();
      });
  }
  fetchCompania() {
    this.cS.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      this.companias.sort((a, b) => {
        return a.desc_id - b.desc_id;
      });
      console.log('compañias', this.companias);
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
  openDialog(id): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: 'No podras deshacer este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.delete(id);
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'El proyecto se ha borrado.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El proyecto no sera eliminado :)',
          'error'
        );
      }
    });
  }
}
