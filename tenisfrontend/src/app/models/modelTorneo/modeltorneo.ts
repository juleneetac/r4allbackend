import { Modelusuario } from '../modelUsusario/modelusuario';

export class Modeltorneo {
    deporte: string;
    di: string;   // soble o individual
    ubicacion: string;
    ganador: Modelusuario;
    puntos: Number;   //ni idea, creo que mejor borrarla
    organizador: Modelusuario;
    participantes: [Modelusuario];
}
