import { Moment } from 'moment';
import { IPersonne } from 'app/shared/model/personne.model';

export interface IDevice {
    id?: number;
    uuid?: string;
    numero?: string;
    indicatifInternational?: number;
    notificationUid?: string;
    marque?: string;
    model?: string;
    activationCode?: number;
    activationTentative?: number;
    activationDate?: Moment;
    personnes?: IPersonne[];
}

export class Device implements IDevice {
    constructor(
        public id?: number,
        public uuid?: string,
        public numero?: string,
        public indicatifInternational?: number,
        public notificationUid?: string,
        public marque?: string,
        public model?: string,
        public activationCode?: number,
        public activationTentative?: number,
        public activationDate?: Moment,
        public personnes?: IPersonne[]
    ) {}
}
