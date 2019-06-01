export interface IAdresse {
    id?: number;
    adressePostale?: string;
    codePostale?: string;
    ville?: string;
    pays?: string;
}

export class Adresse implements IAdresse {
    constructor(
        public id?: number,
        public adressePostale?: string,
        public codePostale?: string,
        public ville?: string,
        public pays?: string
    ) {}
}
