import { ICommercant } from 'app/shared/model/commercant.model';

export interface ICommercantInformations {
    id?: number;
    cle?: string;
    valeur?: string;
    commercant?: ICommercant;
}

export class CommercantInformations implements ICommercantInformations {
    constructor(public id?: number, public cle?: string, public valeur?: string, public commercant?: ICommercant) {}
}
