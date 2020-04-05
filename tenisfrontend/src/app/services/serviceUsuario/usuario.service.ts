import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Ambiente } from '../ambiente';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modellogin } from 'src/app/models/modelLogin/modellogin';
import { Modelregister } from 'src/app/models/modelRegister/modelregister';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ambiente: Ambiente;           //no se lo que hace pero se tiene que poner

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
  }

  login(login: Modellogin)  {
    return this.http.post(this.ambiente.urlUsuario + '/login', login);
   }

  registrar(register: Modelregister) { 
    return this.http.post(this.ambiente.urlUsuario + '/register', register);
  }

  getUsuarios(): Observable<Modelusuario[]>{  //esto es el observable. me da un array de subjects
    return this.http.get<Modelusuario[]>(this.ambiente.urlUsuario + '/getusrs');  
  }

}
