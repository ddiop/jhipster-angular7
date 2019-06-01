import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPropConfig } from 'app/shared/model/prop-config.model';

type EntityResponseType = HttpResponse<IPropConfig>;
type EntityArrayResponseType = HttpResponse<IPropConfig[]>;

@Injectable({ providedIn: 'root' })
export class PropConfigService {
    public resourceUrl = SERVER_API_URL + 'api/prop-configs';

    constructor(protected http: HttpClient) {}

    create(propConfig: IPropConfig): Observable<EntityResponseType> {
        return this.http.post<IPropConfig>(this.resourceUrl, propConfig, { observe: 'response' });
    }

    update(propConfig: IPropConfig): Observable<EntityResponseType> {
        return this.http.put<IPropConfig>(this.resourceUrl, propConfig, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPropConfig>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPropConfig[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
