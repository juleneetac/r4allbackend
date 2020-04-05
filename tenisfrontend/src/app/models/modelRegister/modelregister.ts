export class Modelregister{
    username: string;
    mail: string;
    password: string;
    edad: number;
    sexo: string;
    ubicacion: string;


    constructor(username = '', mail='', password = '', edad = 0, sexo= '', ubicacion= '') {
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.edad = edad;
        this.sexo = sexo;
        this.ubicacion = ubicacion;
        
    }
    
}
