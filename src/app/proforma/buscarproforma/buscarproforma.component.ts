import { Component, OnInit } from '@angular/core';
import { ProformaService } from 'src/app/core/service/proforma.service';

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

  fetchProforma(){
    this.proformaService.getAllProformas()
    .subscribe(res=> {
      this.proforma = res;
      console.log(this.proforma)
    })
  }

}
