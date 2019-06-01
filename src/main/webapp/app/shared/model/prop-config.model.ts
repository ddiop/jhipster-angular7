export interface IPropConfig {
    id?: number;
    nom?: string;
    valeur?: string;
    description?: string;
    version?: string;
}

export class PropConfig implements IPropConfig {
    constructor(public id?: number, public nom?: string, public valeur?: string, public description?: string, public version?: string) {}
}
