import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private torneoService: TorneoService) { }

  usuarios: Modelusuario[];
  torneos: Modeltorneo[];
  password: String;
  usuario:String;
  
  ngOnInit(){
  }

  loginUser(event){
    event.preventDefault()
    console.log(event)
   // let credencial: Modelcredencial = new Modelcredencial(this.usuario, this.password)
   // this.usuarioService.login(credencial).subscribe()
  }

}
