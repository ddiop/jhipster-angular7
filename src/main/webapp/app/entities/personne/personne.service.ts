import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonne } from 'app/shared/model/personne.model';

type EntityResponseType = HttpResponse<IPersonne>;
type EntityArrayResponseType = HttpResponse<IPersonne[]>;

@Injectable({ providedIn: 'root' })
export class PersonneService {
    public resourceUrl = SERVER_API_URL + 'api/personnes';

    constructor(protected http: HttpClient) {}

    create(personne: IPersonne): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(personne);
        return this.http
            .post<IPersonne>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(personne: IPersonne): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(personne);
        return this.http
            .put<IPersonne>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersonne>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonne[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(personne: IPersonne): IPersonne {
        const copy: IPersonne = Object.assign({}, personne, {
            dateNaissance:
                personne.dateNaissance != null && personne.dateNaissance.isValid() ? personne.dateNaissance.format(DATE_FORMAT) : null,
            cguDateValidation:
                personne.cguDateValidation != null && personne.cguDateValidation.isValid()
                    ? personne.cguDateValidation.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateNaissance = res.body.dateNaissance != null ? moment(res.body.dateNaissance) : null;
            res.body.cguDateValidation = res.body.cguDateValidation != null ? moment(res.body.cguDateValidation) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((personne: IPersonne) => {
                personne.dateNaissance = personne.dateNaissance != null ? moment(personne.dateNaissance) : null;
                personne.cguDateValidation = personne.cguDateValidation != null ? moment(personne.cguDateValidation) : null;
            });
        }
        return res;
    }
}
