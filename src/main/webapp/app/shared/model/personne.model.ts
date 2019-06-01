import { Moment } from 'moment';
import { IAdresse } from 'app/shared/model/adresse.model';
import { IParticipant } from 'app/shared/model/participant.model';
import { IDevice } from 'app/shared/model/device.model';

export const enum CIVILITE {
    MR = 'MR',
    MME = 'MME'
}

export const enum LANGUAGE {
    FR = 'FR',
    EN = 'EN'
}

export interface IPersonne {
    id?: number;
    surnom?: string;
    civilite?: CIVILITE;
    prenom?: string;
    nom?: string;
    mail?: string;
    password?: string;
    dateNaissance?: Moment;
    cguVersion?: number;
    cguValide?: boolean;
    cguDateValidation?: Moment;
    langue?: LANGUAGE;
    adresseResidence?: IAdresse;
    participes?: IParticipant[];
    devices?: IDevice[];
}

export class Personne implements IPersonne {
    constructor(
        public id?: number,
        public surnom?: string,
        public civilite?: CIVILITE,
        public prenom?: string,
        public nom?: string,
        public mail?: string,
        public password?: string,
        public dateNaissance?: Moment,
        public cguVersion?: number,
        public cguValide?: boolean,
        public cguDateValidation?: Moment,
        public langue?: LANGUAGE,
        public adresseResidence?: IAdresse,
        public participes?: IParticipant[],
        public devices?: IDevice[]
    ) {
        this.cguValide = this.cguValide || false;
    }
}
