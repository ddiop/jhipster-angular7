import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommercantInformations } from 'app/shared/model/commercant-informations.model';
import { CommercantInformationsService } from './commercant-informations.service';
import { CommercantInformationsComponent } from './commercant-informations.component';
import { CommercantInformationsDetailComponent } from './commercant-informations-detail.component';
import { CommercantInformationsUpdateComponent } from './commercant-informations-update.component';
import { CommercantInformationsDeletePopupComponent } from './commercant-informations-delete-dialog.component';
import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';

@Injectable({ providedIn: 'root' })
export class CommercantInformationsResolve implements Resolve<ICommercantInformations> {
    constructor(private service: CommercantInformationsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICommercantInformations> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CommercantInformations>) => response.ok),
                map((commercantInformations: HttpResponse<CommercantInformations>) => commercantInformations.body)
            );
        }
        return of(new CommercantInformations());
    }
}

export const commercantInformationsRoute: Routes = [
    {
        path: '',
        component: CommercantInformationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercantInformations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CommercantInformationsDetailComponent,
        resolve: {
            commercantInformations: CommercantInformationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercantInformations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CommercantInformationsUpdateComponent,
        resolve: {
            commercantInformations: CommercantInformationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercantInformations.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CommercantInformationsUpdateComponent,
        resolve: {
            commercantInformations: CommercantInformationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercantInformations.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commercantInformationsPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: CommercantInformationsDeletePopupComponent,
        resolve: {
            commercantInformations: CommercantInformationsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.commercantInformations.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
