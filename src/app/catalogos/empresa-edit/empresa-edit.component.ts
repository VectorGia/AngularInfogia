import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniaService } from 'src/app/core/service/compania.service';

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {
  mostrarDatos: boolean;
  form: FormGroup;
  id: string;
  constructor(private aR: ActivatedRoute, private fB: FormBuilder, private cS: CompaniaService, private router: Router) { 
      this.builForm();
  }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      
      this.id = params.id;
      console.log(this.id)
      this.cS.getCompania(this.id)
        .subscribe(data => {
          console.log(data)
          this.form.patchValue(data)
          console.log(this.form)
        })
    })
  }
  return(){
    this.router.navigate(['./catalogo/empresa'])
   }
  saveCompania(event: Event){
    event.preventDefault();
    if(this.form.valid){
      const compania = this.form.value;
      this.cS.updateCompania(this.id, compania)
      .subscribe((newCompania) => {
        console.log(newCompania);
        this.router.navigate(['./catalogo/empresa'])
      });
    }
  }

  private builForm(){
    this.form = this.fB.group({
      desc_id: ['', [Validators.required]],
      nombre: ['', Validators.required],
      abrev: ['', Validators.required],
      activo_etl: ['', Validators.required],
      host: ['', Validators.required],
      puerto_compania: ['', Validators.required],
      usuario_etl: ['', Validators.required],
      contrasenia_etl: ['', Validators.required],
      bd_name: ['', Validators.required],
      moneda_id: ['', Validators.required],
      activo: [true, Validators.required]
    })
  }
  activar():void{
    this.mostrarDatos = true;
  }
  desactivar():void{
    this.mostrarDatos = false;
  }

  
}
