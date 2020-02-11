import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonedaService } from 'src/app/core/service/moneda.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-moneda-edit',
  templateUrl: './moneda-edit.component.html',
  styleUrls: ['./moneda-edit.component.css']
})
export class MonedaEditComponent implements OnInit {
id: string;
formMonedaEdit: FormGroup;
  constructor(private router: Router, private aR: ActivatedRoute, private mS: MonedaService, private fB: FormBuilder) {
    this.buildEdit();
   }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id)
      this.mS.getMoneda(this.id)
      .subscribe(data => {
        console.log("datos",data)
        this.formMonedaEdit.patchValue(data)
      })
    })
  }
  saveMoneda(event: Event){
    event.preventDefault();
    if(this.formMonedaEdit.valid){
      const moneda = this.formMonedaEdit.value;
      this.mS.updateMoneda(this.id,moneda)
      .subscribe((newMoneda) => {
        console.log(newMoneda);
        this.router.navigate(['./catalogo/cambio'])
      })
    }
  }
  buildEdit(){
    this.formMonedaEdit = this.fB.group({
      descripcion: [null, Validators.required],
      clave: [null, Validators.required],
      pais: [null, Validators.required],
      estatus: [null, Validators.required]
    })
  }
  return(){
    this.router.navigate(['./catalogo/empresa'])
   }
}
