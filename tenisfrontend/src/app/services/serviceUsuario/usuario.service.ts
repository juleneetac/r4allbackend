import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Ambiente } from '../ambiente';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  ambiente: Ambiente;           //no se lo que hace pero se tiene que poner

  constructor(private http: HttpClient) {
    this.ambiente = new Ambiente();
  }

  login(usuario: Modelusuario)  {
    return this.http.post(this.ambiente.urlUsuario + '/login', usuario);
   }

  registrar(usuario: Modelusuario) {
    return this.http.post(this.ambiente.urlUsuario + '/register', usuario);
  }

}
