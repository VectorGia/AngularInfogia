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
  constructor(private proformaService: ProformaService, private exportService: ExcelService) { }

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
          'El periodo se ha borrado.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El periodo no se elimino :)',
          'error'
        );
      }
    });

  }
  delete(id) {
    this.proformaService.deleteProforma(id).subscribe(
      (res) => {
       this.ngOnInit();
      }
    );
  }


}
