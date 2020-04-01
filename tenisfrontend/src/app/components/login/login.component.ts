import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormControl } from '@angular/forms';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private torneoService: TorneoService) { }

  //usuarios: Modelusuario[]; en el login no es necesario
  //torneos: Modeltorneo[];
  password: string;
  username: string;
  
  ngOnInit(){
  }

  loginUser(event){
    event.preventDefault()
    console.log(event)
    let credencial: Modellogin = new Modellogin(this.username, this.password)
    this.usuarioService.login(credencial).subscribe(
      res =>{
              console.log(res);
              confirm('login correcto')
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
    else if  (err.status == 404) {
      console.log('nose');
      confirm('Usuario no existente');
    }
    else if  (err.status == 401) {
      console.log('salida');
      confirm('Unauthorized');
    }
    else if  (err.status == 402) {
      console.log('nmal password');
      confirm('Incorrect password');
    }
    
  }

}
