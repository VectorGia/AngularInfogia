import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/core/service/grupo.service';
import { UsuarioService } from 'src/app/core/service/usuario.service';
import { RolService } from 'src/app/core/service/rol.service';
import { RelacionesService } from 'src/app/core/service/relaciones.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { CompaniaService } from 'src/app/core/service/compania.service';
import { NegocioService } from 'src/app/core/service/negocio.service';
import { ProyectoService } from 'src/app/core/service/proyecto.service';
import { CentrosService } from 'src/app/core/service/centros.service';
import { RelacionesCatalogoService } from 'src/app/core/service/relaciones-catalogo.service';
import { PermisosService } from 'src/app/core/service/permisos.service';
import { PantallaService } from 'src/app/core/service/pantalla.service';
import { RelacionModelo } from 'src/app/core/models/relmod';
import { RelmodeloService } from 'src/app/core/service/relmodelo.service';

@Component({
  selector: 'app-relacion',
  templateUrl: './relacion.component.html',
  styleUrls: ['./relacion.component.css']
})
export class RelacionComponent implements OnInit {
  grupos = [];
  usuarios = [];
  roles = [];
  companias = [];
  negocios = [];
  proyectos = [];
  centros = [];
  permisos = [];
  pantallas = [];
  per = [];
  pants = new FormControl();
  relaionForm: FormGroup;
  formCatalogos: FormGroup;
  cuentaForm: FormGroup;
  rolItem: "";
  panelOpenState = false;
  constructor(private gS: GrupoService,
              private uS: UsuarioService,
              private rS: RolService,
              private rlS: RelacionesService,
              private fB: FormBuilder,
              private cS: CompaniaService,
              private nS: NegocioService,
              private pS: ProyectoService,
              private ccS: CentrosService,
              private pmS: PermisosService,
              private ptS: PantallaService,
              private rcS: RelacionesCatalogoService,
              private rM: RelmodeloService) {
                this.buildForm();
                this.buildFormCatalogos();
                this.buildModelo();
  }

  ngOnInit() {
    this.fetchGrupo();
    this.fetchUsuario();
    this.fetchRol();
    this.fetchCompania();
    this.fetchModelos();
    this.fetchProyecto();
    this.fetchCC();
    this.fetchPermisos();
    this.fetchPantallas();
  }

  fetchGrupo(){
     this.gS.getAllGrupo()
     .subscribe(grupos => {
         this.grupos = grupos;
         console.log("grupo1",this.grupos)
       });
  }
  fetchUsuario(){
     this.uS.getAllUsuarios()
     .subscribe(user => {
       this.usuarios = user;
       console.log("usuarios",this.usuarios)
     });
  }
  fetchRol(){
    this.rS.getAllRoles()
    .subscribe(rol => {
      this.roles = rol;
      console.log("roles",this.roles)
    });
  }
  fetchPantallas(){
    this.ptS.getAllPantallas()
    .subscribe(pantalla => {
      this.pantallas = pantalla;
      console.log("pantallas", this.pantallas)
    });
  }
  fetchPermisos(){
    this.pmS.getAllPermisos()
    .subscribe(permiso => {
      this.permisos = permiso;
      console.log("permiso", this.permisos)
    });
  }
  fetchCompania(){
    this.cS.getAllCompania()
    .subscribe(compania => {
      this.companias = compania;
      console.log("compañias",this.companias)
    })
  }
  fetchModelos(){
    this.nS.getAllModelos()
    .subscribe(modelo => {
      this.negocios = modelo;
      console.log("modelos", this.negocios)
    })
  }
  fetchProyecto(){
    this.pS.getAllProyecto()
    .subscribe(proyecto => {
      this.proyectos = proyecto;
      console.log("proyectos", this.proyectos)
    })
  }
  fetchCC(){
    this.ccS.getAllCentros()
    .subscribe(cc => {
      this.centros = cc;
      console.log("centros", this.centros)
    })
  }

  buildForm(){
  
    this.relaionForm = this.fB.group({
      INT_IDGRUPO_P: ['', Validators.required],
      INT_IDUSUARIO_P: ['', Validators.required],
      INT_IDROL_P: ['', Validators.required],
      INT_IDPANTALLA_P: ['', Validators.required],
      INT_IDPERMISO_P: ['', Validators.required],
      BOOL_ESTATUS_LOGICO_RELUSU: [true]
    })
  }
  buildFormCatalogos(){
    this.formCatalogos = this.fB.group({
      INT_IDCOMPANIA_P: ['', Validators.required],
      INT_IDROL_P: ['', Validators.required],
      INT_IDMODELO_NEGOCIO_P: ['', Validators.required],
      INT_IDPROYECTO_P: ['', Validators.required],
      INT_IDCENTROSCOSTO_P: ['', Validators.required],
      BOOL_ESTATUS_LOGICO_RELACION_COMPANIA: [true]
    })
  }
  buildModelo(){
    this.cuentaForm = this.fB.group({
      INT_IDMODELO: ['', Validators.required],
      STR_CONCEPTO: ['', Validators.required],
      STR_CTA_INICIO: ['', Validators.required],
      STR_CTA_FIN: ['', Validators.required]
    })
  }
  send(form: NgForm){
    console.log(form)
    this.per.push(this.pants)
    console.log("per", this.per)
    this.rlS.postRelaciones(form).subscribe(
      res => {
        let id = res['INT_IDROL_F']
        console.log("exito")
      }
    )
  }

  saveCatalogos(formCat: NgForm){
    console.log(formCat)
    this.rcS.postRelacionesCat(formCat).subscribe(
      res => {
        let id = res["INT_IDRELACION_COMPANIA"]
        alert("Relacion lista");
      }
    )
  }

  onSave(formM: NgForm){
    console.log("si entra")
    this.rM.postRelMod(formM).subscribe(
      res => {
        let id = res["INT_IDMODELO"]
        alert("Cuentas asignadas")
      }
    )
  }
}
