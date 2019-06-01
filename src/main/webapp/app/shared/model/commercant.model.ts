import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';

export interface ICommercant {
    id?: number;
    nom?: string;
    information?: ICommercantInformations[];
}

export class Commercant implements ICommercant {
    constructor(public id?: number, public nom?: string, public information?: ICommercantInformations[]) {}
}
