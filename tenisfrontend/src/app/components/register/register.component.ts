import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/serviceUsuario/usuario.service';
import { TorneoService } from 'src/app/services/serviceTorneo/torneo.service';
import { Modelusuario } from 'src/app/models/modelUsusario/modelusuario';
import { Modeltorneo } from 'src/app/models/modelTorneo/modeltorneo';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl  } from '@angular/forms';
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
    registerForm: FormGroup;   //para los validators
    validation_messages: any;  //para los validators
    username: string;
    password: string;
    edad: number;
    sexo: string;
    ubicacion: string;
    mail: string;

  constructor(private usuarioService: UsuarioService, private torneoService: TorneoService, private router: Router,  private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({

      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[A-Z]+(([',. -][A-Z ])?[a-zA-Z0-9]*)*$/),
        Validators.minLength(3)])),
    
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])),

      pass: new FormControl('', Validators.compose([  //se pone el nombre del form control donde pone formControlName
          Validators.required,
          //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).+$/),
          Validators.minLength(3)])),

      edad: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]+$/)])),

      sexo: new FormControl('', Validators.compose([
             Validators.required,
            Validators.pattern(/^[mf]$/)])),  

      ubicacion: new FormControl('', Validators.compose([
              Validators.required,])),  
    }
  );
}

    

  ngOnInit() {
    this.validation_messages = {
      'username': [
        { type: 'required', message: 'Name is required'},
        { type: 'unique', message: 'Username must be unique'} ,
        { type: 'pattern', message: 'Debe empezar con mayúsculas y no contener espacios' },
        { type: 'minlength', message: 'Demasiado corto'}
      ],
       'mail': [
         { type: 'required', message: 'Email is required' },
         { type: 'unique', message: 'Email must be unique'} ,
         { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain' }
       ],
      'pass': [
        { type: 'required', message: 'Password is required'},
        //{ type: 'pattern', message: 'Debe contener almenos una minúsucla, mayúscula, un número y un carácter especial'},
        { type: 'minlength', message: 'Minimo 3 letras o números'}
      ],
      'edad': [
        { type: 'required', message: 'Age is required'},
        { type: 'pattern', message: 'Debe ser un numero'}
      ],
      'sexo': [
        { type: 'required', message: 'Sexo is required'},
        { type: 'pattern', message: 'Pon " m " para masculino y " f " para femenino'}
      ],
      'ubicacion': [
        { type: 'required', message: 'Especifique ubicación'}
      ],
  }
}

   //rutas
   goMain() {
    this.router.navigateByUrl("main")
  }

  registerUser(event){
    event.preventDefault()
    console.log(event)
    let credencialr: Modelregister = new Modelregister(this.username, this.mail, this.password, this.edad, this.sexo, this.ubicacion)
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
      //hacer con mail tambien
  }
}

}
