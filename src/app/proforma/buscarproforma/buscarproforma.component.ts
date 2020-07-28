import { Component, OnInit } from '@angular/core';
import { ProformaService } from 'src/app/core/service/proforma.service';
import { ExcelService } from 'src/app/core/service/excel.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-buscarproforma',
  templateUrl: './buscarproforma.component.html',
  styleUrls: ['./buscarproforma.component.css']
})
export class BuscarproformaComponent implements OnInit {
  displayedColumns = ['id', 'nombre', 'fecha', 'action'];
  proforma: any;
  constructor(private proformaService: ProformaService) { }

  ngOnInit() {
    this.fetchProforma();
  }

  fetchProforma() {
    this.proformaService.getAllProformas()
    .subscribe(res => {
      this.proforma = res;
      console.log('consultar: ', this.proforma);
    });
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
          'La proforma se ha borrado.',
          'success'
        );
      }});

  }
  delete(id) {
    this.proformaService.deleteProforma(id).subscribe(
      (res) => {
       this.ngOnInit();
      }
    );
  }


}
