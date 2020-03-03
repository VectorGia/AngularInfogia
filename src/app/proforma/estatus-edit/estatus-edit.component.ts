import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoproformaService } from 'src/app/core/service/tipoproforma.service';
import { TipocapturaService } from 'src/app/core/service/tipocaptura.service';
import { PeriodoService } from 'src/app/core/service/periodo.service';

@Component({
  selector: 'app-estatus-edit',
  templateUrl: './estatus-edit.component.html',
  styleUrls: ['./estatus-edit.component.css']
})
export class EstatusEditComponent implements OnInit {
  fecha: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  editPeriodoForm: FormGroup;
  id: any;
  tcaptura: any;
  proformar: any;
  info: any;
  constructor(private activeRoute: ActivatedRoute,
              private periodoService: PeriodoService,
              private capturaService: TipocapturaService,
              private proformarService: TipoproformaService,
              private formBuilder: FormBuilder,
              private router: Router ) {
                this.buildEditForm();
               }

  ngOnInit() {
    this.fetchTipoCaptura();
    this.fetchTipoProformar();
    this.activeRoute.params.subscribe(params => {
      this.id = params.id;
      this.periodoService.getPeriodo(this.id)
      .subscribe(data => {
        console.log(data);
        this.editPeriodoForm.patchValue(data);
      });
    });
  }

  buildEditForm() {
    this.editPeriodoForm = this.formBuilder.group({
      tipo_captura_id: [''],
      tipo_proforma_id: [''],
      anio_periodo: ['']
    });
  }
  fetchTipoCaptura() {
    this.capturaService.getAllTipoCaptura()
    .subscribe( res => {
      this.tcaptura = res;
      console.log('Tipos captura: ', this.tcaptura);
    });
  }
  fetchTipoProformar() {
    this.proformarService.getAllTipoProformas()
    .subscribe( res => {
      this.proformar = res;
      console.log('Tipo Proformar: ', this.proformar);
    });
  }

  saveEdit(event: Event) {
    event.preventDefault();
    if (this.editPeriodoForm.valid) {
      const periodo = this.editPeriodoForm.value;
      this.periodoService.updatePeriodo(this.id, periodo)
      .subscribe(periodoUp => {
        console.log(periodo);
        this.router.navigate(['./proforma/estatus']);
      })
    }
  }
}
