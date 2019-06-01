export interface IImageBase64 {
    id?: number;
    name?: string;
    chemin?: string;
    imageContentType?: string;
    image?: any;
}

export class ImageBase64 implements IImageBase64 {
    constructor(public id?: number, public name?: string, public chemin?: string, public imageContentType?: string, public image?: any) {}
}
