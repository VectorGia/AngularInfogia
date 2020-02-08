import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroService } from 'src/app/core/service/rubro.service';
import { element } from 'protractor';

@Component({
  selector: 'app-rubros-edit',
  templateUrl: './rubros-edit.component.html',
  styleUrls: ['./rubros-edit.component.css']
})
export class RubrosEditComponent implements OnInit {
editRubro: FormGroup;
id: string;
rubro: any;
disabledC: boolean = true;
disabledR: boolean = true;
  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute,
    private rubroService: RubroService, 
    private router: Router) { 
      this.buildEditForm();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.id = params.id;
      console.log("id rubros: ", this.id);
      this.rubroService.getRubroById(this.id)
      .subscribe(data => {
        console.log("data: ",data)
        if(data[0].aritmetica != ""){
          this.disabledC = false
          this.disabledR = true;
        }else{
          this.disabledR = false;
          this.disabledC = true;
        }
        this.editRubro.patchValue(data[0])
      })
    })
  }

  buildEditForm(){
    this.editRubro = this.formBuilder.group({
      nombre: [null, Validators.required],
      clave: ['',Validators.required],
      rangos_cuentas_incluidas: [''],
      rango_cuentas_excluidas: [''],
      aritmetica: ['']
    })
  }

  saveEdit(event: Event){
    event.preventDefault();
    if(this.editRubro.valid){
      const rubro = this.editRubro.value;
      this.rubroService.updateRubro(this.id, rubro)
      .subscribe((newRubro) => {
        
        this.router.navigate(['./catalogo/negocio/rubros/'+ this.getData(window.location.href,"rubros/","/edit") ])
      })
    }
  }

  getData(url,startDelimiter,endDelimiter){
    var idxIni=url.indexOf(startDelimiter);
    idxIni=idxIni+startDelimiter.length;
    var idxFin=url.indexOf(endDelimiter);
    if(idxFin===-1){
        return url.substring(idxIni);
    }else{
        return url.substring(idxIni,idxFin)
    }
}
}
