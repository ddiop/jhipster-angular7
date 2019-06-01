import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IImageBase64 } from 'app/shared/model/image-base-64.model';

type EntityResponseType = HttpResponse<IImageBase64>;
type EntityArrayResponseType = HttpResponse<IImageBase64[]>;

@Injectable({ providedIn: 'root' })
export class ImageBase64Service {
    public resourceUrl = SERVER_API_URL + 'api/image-base-64-s';

    constructor(protected http: HttpClient) {}

    create(imageBase64: IImageBase64): Observable<EntityResponseType> {
        return this.http.post<IImageBase64>(this.resourceUrl, imageBase64, { observe: 'response' });
    }

    update(imageBase64: IImageBase64): Observable<EntityResponseType> {
        return this.http.put<IImageBase64>(this.resourceUrl, imageBase64, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IImageBase64>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IImageBase64[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
