import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from 'src/app/core/service/proyecto.service';

@Component({
  selector: 'app-proyecto-edit',
  templateUrl: './proyecto-edit.component.html',
  styleUrls: ['./proyecto-edit.component.css']
})
export class ProyectoEditComponent implements OnInit {
  proyectoForm: FormGroup;
  id: string;
  constructor(private aR: ActivatedRoute,
    private fB: FormBuilder,
    private pS: ProyectoService,
    private router: Router) {
      this.buildForm();
    }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      console.log(this.id)
      this.pS.getProyecto(this.id)
      .subscribe(data => {
        
        this.proyectoForm.patchValue(data)
        console.log(this.proyectoForm)
      })
    })
  }
  return(){
    this.router.navigate(['./admin/user'])
   }
  saveProyecto(event: Event){
    event.preventDefault();
    if(this.proyectoForm.valid){
      const proyecto = this.proyectoForm.value;
      this.pS.updateProyecto(this.id, proyecto)
      .subscribe((newProyecto) => {
        this.router.navigate(['./catalogo/proyecto'])
      })
    }
  }
  private buildForm(){
    this.proyectoForm = this.fB.group({
      desc_id: ['', Validators.required],
      nombre: ['', Validators.required],
      responsable: ['', Validators.required],
      estatus: ['', Validators.required]
    })
  }

}
