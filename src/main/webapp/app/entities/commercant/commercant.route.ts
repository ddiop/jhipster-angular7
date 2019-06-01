import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Commercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';
import { CommercantComponent } from './commercant.component';
import { CommercantDetailComponent } from './commercant-detail.component';
import { CommercantUpdateComponent } from './commercant-update.component';
import { CommercantDeletePopupComponent } from './commercant-delete-dialog.component';
import { ICommercant } from 'app/shared/model/commercant.model';

@Injectable({ providedIn: 'root' })
export class CommercantResolve implements Resolve<ICommercant> {
    constructor(private service: CommercantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommercant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Commercant>) => response.ok),
                map((commercant: HttpResponse<Commercant>) => commercant.body)
            );
        }
        return of(new Commercant());
    }
}

export const commercantRoute: Routes = [
    {
        path: '',
        component: CommercantComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CommercantDetailComponent,
        resolve: {
            commercant: CommercantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CommercantUpdateComponent,
        resolve: {
            commercant: CommercantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercant.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CommercantUpdateComponent,
        resolve: {
            commercant: CommercantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commercantPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CommercantDeletePopupComponent,
        resolve: {
            commercant: CommercantResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
