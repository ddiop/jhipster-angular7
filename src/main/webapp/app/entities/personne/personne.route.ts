import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Personne } from 'app/shared/model/personne.model';
import { PersonneService } from './personne.service';
import { PersonneComponent } from './personne.component';
import { PersonneDetailComponent } from './personne-detail.component';
import { PersonneUpdateComponent } from './personne-update.component';
import { PersonneDeletePopupComponent } from './personne-delete-dialog.component';
import { IPersonne } from 'app/shared/model/personne.model';

@Injectable({ providedIn: 'root' })
export class PersonneResolve implements Resolve<IPersonne> {
    constructor(private service: PersonneService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPersonne> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Personne>) => response.ok),
                map((personne: HttpResponse<Personne>) => personne.body)
            );
        }
        return of(new Personne());
    }
}

export const personneRoute: Routes = [
    {
        path: '',
        component: PersonneComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'jhipsterApp.personne.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PersonneDetailComponent,
        resolve: {
            personne: PersonneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.personne.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PersonneUpdateComponent,
        resolve: {
            personne: PersonneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.personne.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PersonneUpdateComponent,
        resolve: {
            personne: PersonneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.personne.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personnePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PersonneDeletePopupComponent,
        resolve: {
            personne: PersonneResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.personne.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
