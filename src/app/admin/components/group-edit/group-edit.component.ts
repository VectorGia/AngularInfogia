import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GrupoService } from 'src/app/core/service/grupo.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  formEditGrupo: FormGroup;
  id: string;
  constructor(private fB: FormBuilder, private router: Router,
            private sG: GrupoService, private aR: ActivatedRoute) { 
              this.buildEditGrupo();
            }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      this.id = params.id;
      this.sG.getGrupo(this.id)
      .subscribe(grupo => {
        console.log(grupo)
        this.formEditGrupo.patchValue(grupo)
      })
    })
  }

  buildEditGrupo(){
    this.formEditGrupo = this.fB.group({
      stR_NOMBRE_GRUPO: ['', Validators.required]
    })
  }
  return(){
    this.router.navigate(['./admin/user'])
   }
  saveGrupo(event: Event){
    event.preventDefault();
    if(this.formEditGrupo.valid){
      const grupo = this.formEditGrupo.value;
      this.sG.updateGrupo(this.id, grupo)
      .subscribe((editGrupo) => {
        this.router.navigate(['./admin/group'])
      })
    }
  }

}
