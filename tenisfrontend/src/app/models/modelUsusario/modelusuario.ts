
import { Modeltorneo } from '../modelTorneo/modeltorneo';

export class Modelusuario {
    username: String;
    password: String;
    sexo: String;
    rutaimagen: String;
    ubicacion: String;
    edad: Number;
    exp: String;
    valoracion: Number;
    partidas: [String]; // cambiar a Modelpartida
    torneos: [Modeltorneo]; 
    chats: [String];    // cambiar a Modelchat
    amigos: [Modelusuario]; 
}
