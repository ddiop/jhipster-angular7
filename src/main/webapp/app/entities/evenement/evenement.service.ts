import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEvenement } from 'app/shared/model/evenement.model';

type EntityResponseType = HttpResponse<IEvenement>;
type EntityArrayResponseType = HttpResponse<IEvenement[]>;

@Injectable({ providedIn: 'root' })
export class EvenementService {
    public resourceUrl = SERVER_API_URL + 'api/evenements';

    constructor(protected http: HttpClient) {}

    create(evenement: IEvenement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evenement);
        return this.http
            .post<IEvenement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(evenement: IEvenement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(evenement);
        return this.http
            .put<IEvenement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEvenement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEvenement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(evenement: IEvenement): IEvenement {
        const copy: IEvenement = Object.assign({}, evenement, {
            dateDepart: evenement.dateDepart != null && evenement.dateDepart.isValid() ? evenement.dateDepart.format(DATE_FORMAT) : null,
            dateRetour: evenement.dateRetour != null && evenement.dateRetour.isValid() ? evenement.dateRetour.format(DATE_FORMAT) : null,
            dateReflexion:
                evenement.dateReflexion != null && evenement.dateReflexion.isValid() ? evenement.dateReflexion.format(DATE_FORMAT) : null,
            dateCreation:
                evenement.dateCreation != null && evenement.dateCreation.isValid() ? evenement.dateCreation.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateDepart = res.body.dateDepart != null ? moment(res.body.dateDepart) : null;
            res.body.dateRetour = res.body.dateRetour != null ? moment(res.body.dateRetour) : null;
            res.body.dateReflexion = res.body.dateReflexion != null ? moment(res.body.dateReflexion) : null;
            res.body.dateCreation = res.body.dateCreation != null ? moment(res.body.dateCreation) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((evenement: IEvenement) => {
                evenement.dateDepart = evenement.dateDepart != null ? moment(evenement.dateDepart) : null;
                evenement.dateRetour = evenement.dateRetour != null ? moment(evenement.dateRetour) : null;
                evenement.dateReflexion = evenement.dateReflexion != null ? moment(evenement.dateReflexion) : null;
                evenement.dateCreation = evenement.dateCreation != null ? moment(evenement.dateCreation) : null;
            });
        }
        return res;
    }
}
