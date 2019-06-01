import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Adresse } from 'app/shared/model/adresse.model';
import { AdresseService } from './adresse.service';
import { AdresseComponent } from './adresse.component';
import { AdresseDetailComponent } from './adresse-detail.component';
import { AdresseUpdateComponent } from './adresse-update.component';
import { AdresseDeletePopupComponent } from './adresse-delete-dialog.component';
import { IAdresse } from 'app/shared/model/adresse.model';

@Injectable({ providedIn: 'root' })
export class AdresseResolve implements Resolve<IAdresse> {
    constructor(private service: AdresseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAdresse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Adresse>) => response.ok),
                map((adresse: HttpResponse<Adresse>) => adresse.body)
            );
        }
        return of(new Adresse());
    }
}

export const adresseRoute: Routes = [
    {
        path: '',
        component: AdresseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.adresse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AdresseDetailComponent,
        resolve: {
            adresse: AdresseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.adresse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AdresseUpdateComponent,
        resolve: {
            adresse: AdresseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.adresse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AdresseUpdateComponent,
        resolve: {
            adresse: AdresseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.adresse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adressePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AdresseDeletePopupComponent,
        resolve: {
            adresse: AdresseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.adresse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
