import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CompaniaService} from 'src/app/core/service/compania.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ProyectoService} from 'src/app/core/service/proyecto.service';
import {MatDialog} from '@angular/material';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  displayedColumns: string[] = ['position', 'desc_id', 'name', 'responsable', 'empresa', 'estatus', 'action'];
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
      console.log('Error al obtener los registros', error);
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
          'Listo',
          'Se guardo el proyecto',
          'success'
        );
        this.ngOnInit();
      }, error => {
        Swal.fire(
          'Atención',
          'Ocurrió un error. Causa: ' + error['error'],
          'error'
        );
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
      title: '¿Estás seguro?',
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
          'El proyecto se ha borrado.',
          'success'
        );
      }
    });
  }
}
