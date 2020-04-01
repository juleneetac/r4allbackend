import { Modelusuario } from '../modelUsusario/modelusuario';

export class Modeltorneo {
    deporte: String;
    di: String;   // soble o individual
    ubicacion: String;
    ganador: Modelusuario;
    puntos: Number;   //ni idea, creo que mejor borrarla
    organizador: Modelusuario;
    participantes: [Modelusuario];
}
