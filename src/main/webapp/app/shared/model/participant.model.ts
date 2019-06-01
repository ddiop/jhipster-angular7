import { IPersonne } from 'app/shared/model/personne.model';
import { IEvenement } from 'app/shared/model/evenement.model';

export interface IParticipant {
    id?: number;
    organisateur?: boolean;
    personne?: IPersonne;
    evenement?: IEvenement;
}

export class Participant implements IParticipant {
    constructor(public id?: number, public organisateur?: boolean, public personne?: IPersonne, public evenement?: IEvenement) {
        this.organisateur = this.organisateur || false;
    }
}
