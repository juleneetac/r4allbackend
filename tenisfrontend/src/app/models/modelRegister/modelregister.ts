export class Modelregister{
    username: string;
    password: string;
    edad: number;
    sexo: string;
    ubicacion: string;


    constructor(username = '', password = '', edad = 0, sexo= '', ubicacion= '') {
        this.username = username;
        this.password = password;
        this.edad = edad;
        this.sexo = sexo;
        this.ubicacion = ubicacion;
        
    }
    
}
