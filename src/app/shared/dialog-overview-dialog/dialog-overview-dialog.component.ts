import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { RubroService } from 'src/app/core/service/rubro.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dialog-overview-dialog',
  templateUrl: './dialog-overview-dialog.component.html',
  styleUrls: ['./dialog-overview-dialog.component.css']
})
export class DialogOverviewDialogComponent implements OnInit {
  cuentasForm: FormGroup;
  modelos: any;
  select: boolean;
  id: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogOverviewDialogComponent>,
    private ns: NegocioService,
    private rS: RubroService, 
    private aR: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.buildCuenta();
    
   }

  ngOnInit() {
  }

  buildCuenta(){
    this.cuentasForm = this.fb.group({
      id_modelo_neg: [this.data.id, Validators.required],
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
      rangos_cuentas_incluidas: ['', Validators.required],
      rango_cuentas_excluidas: [''],
      aritmetica: ['', Validators.required],
      activo: [true],
      tipo_id: ['', Validators.required]
    });
  

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  opc(){
    this.select = false;
  }

  opcr(){
    this.select = true;
  }


  onSubmit(){
    if(this.cuentasForm.valid){
      console.log("Form Submitted!");
      this.cuentasForm.reset();
    }
  }

  existClaveIn(rubros, clave){
    for(let i = 0; i< rubros.length; i++){
      if(rubros[i].clave === clave){
        return true;
      }
    }
    return false;
  }

  saveRubro(form: any){
    if( form.aritmetica ){
      this.rS.getRubroByModeloId(this.data.id).subscribe( res => {
        let rubros = res;
        if ( this.existClaveIn(rubros, form.clave) ){
          alert("Ya existe un rubro con la clave " + form.clave + " favor de verificar.");
          return;
        }
        let msg = this.isValidExpresion( {aritmetica: form.aritmetica} ,rubros);
        if(msg){
          alert(msg)
        }else{
          this.rS.postRubro(form).subscribe(
            res => {
              let nombre = res["nombre"];
              this.onNoClick();
              this.ngOnInit();
            })
        }
      })
    }
    else{
      this.rS.getRubroByModeloId(this.data.id).subscribe( res => {
        let rubros = res;
        if ( this.existClaveIn(rubros, form.clave) ){
          alert("Ya existe un rubro con la clave " + form.clave + " favor de verificar.");
          return;
        }
          this.rS.postRubro(form).subscribe(
            res => {
              let nombre = res["nombre"];
              this.onNoClick();
              this.ngOnInit();
     
      })
    })
  }
}


  isValidExpresion( rubroRubros,rubrosCtas) {
    let evaluacion=this.isValid(rubrosCtas,rubroRubros);
    if(!evaluacion.resultado){
        return "Arimética '"+rubroRubros.aritmetica+"' es inválida. Causa:["+evaluacion.mensaje+"]";
    }

  return "";
}
getRubros(rubros,claveTipo) {
let rubrosTipo=[];
for (let i = 0; i < rubros.length; i++) {
    let rubroCtas = rubros[i];
    if (rubroCtas.tipo.clave === claveTipo) {
        rubrosTipo.push(rubroCtas)
    }
}
return rubrosTipo;
}

isValid(rubrosCtas,rubroRubros){
let cvesInAritmetica=this.getUnique(rubroRubros.aritmetica.match(/[A-Za-z]+/g));
for(let i=0;i<cvesInAritmetica.length;i++){
    let clave=cvesInAritmetica[i];
    if(!this.findRubroByClave(rubrosCtas,clave)){
        return  {resultado:false,mensaje:"No se encontro el rubro '"+clave+"' especificado en aritmética, dentro de los rubros"}
    }
}
try {
    eval(rubroRubros.aritmetica.replace(/\w+/g, "1"));
}catch (e) {
    console.error(e);
    return  {resultado:false,mensaje:"Error de evaluación"}
}
return {resultado:true,mensaje:""};

}

findRubroByClave(rubros,clave){
for(let i=0;i<rubros.length;i++){
    if(rubros[i].clave===clave){
        return rubros[i];
    }
}
}

getUnique(array) {
var uniqueArray = [];

for (var i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
    }
}
return uniqueArray;
}



}
