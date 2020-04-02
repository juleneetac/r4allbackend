import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormControl } from '@angular/forms';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { HttpErrorResponse } from '@angular/common/http';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';
import { getLocaleMonthNames } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private torneoService: TorneoService, private router: Router) { }


    username: string;
    password: string;
    edad: number;
    sexo: string;
    ubicacion: string;

  ngOnInit() {
  }

   //rutas
   goMain() {
    this.router.navigateByUrl("main")
  }

  registerUser(event){
    event.preventDefault()
    console.log(event)
    let credencialr: Modelregister = new Modelregister(this.username, this.password, this.edad, this.sexo, this.ubicacion)
    this.usuarioService.registrar(credencialr).subscribe(
      res =>{
              console.log(res);
              confirm('Se registro OK')
              this.goMain();
      },
      err => {
        console.log(err);
        this.handleError(err);
      });
  }

  private handleError(err: HttpErrorResponse) {
    if (err.status == 500) {
      console.log('entra')
      confirm('error');
    } 
    else if  (err.status == 409) {
      console.log('nose');
      confirm('Nombre de usuario ya existe. Pon otro username');
  }
}

}
