import { Moment } from 'moment';
import { ICommercant } from 'app/shared/model/commercant.model';
import { IParticipant } from 'app/shared/model/participant.model';

export interface IEvenement {
    id?: number;
    nom?: string;
    detail?: string;
    lieuDepart?: string;
    lieuDestination?: string;
    dateDepart?: Moment;
    dateRetour?: Moment;
    dateReflexion?: Moment;
    dateCreation?: Moment;
    commercant?: ICommercant;
    participants?: IParticipant[];
}

export class Evenement implements IEvenement {
    constructor(
        public id?: number,
        public nom?: string,
        public detail?: string,
        public lieuDepart?: string,
        public lieuDestination?: string,
        public dateDepart?: Moment,
        public dateRetour?: Moment,
        public dateReflexion?: Moment,
        public dateCreation?: Moment,
        public commercant?: ICommercant,
        public participants?: IParticipant[]
    ) {}
}
