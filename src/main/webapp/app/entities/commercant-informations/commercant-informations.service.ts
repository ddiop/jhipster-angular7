import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';

type EntityResponseType = HttpResponse<ICommercantInformations>;
type EntityArrayResponseType = HttpResponse<ICommercantInformations[]>;

@Injectable({ providedIn: 'root' })
export class CommercantInformationsService {
    public resourceUrl = SERVER_API_URL + 'api/commercant-informations';

    constructor(protected http: HttpClient) {}

    create(commercantInformations: ICommercantInformations): Observable<EntityResponseType> {
        return this.http.post<ICommercantInformations>(this.resourceUrl, commercantInformations, { observe: 'response' });
    }

    update(commercantInformations: ICommercantInformations): Observable<EntityResponseType> {
        return this.http.put<ICommercantInformations>(this.resourceUrl, commercantInformations, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICommercantInformations>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICommercantInformations[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
