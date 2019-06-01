import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PropConfig } from 'app/shared/model/prop-config.model';
import { PropConfigService } from './prop-config.service';
import { PropConfigComponent } from './prop-config.component';
import { PropConfigDetailComponent } from './prop-config-detail.component';
import { PropConfigUpdateComponent } from './prop-config-update.component';
import { PropConfigDeletePopupComponent } from './prop-config-delete-dialog.component';
import { IPropConfig } from 'app/shared/model/prop-config.model';

@Injectable({ providedIn: 'root' })
export class PropConfigResolve implements Resolve<IPropConfig> {
    constructor(private service: PropConfigService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPropConfig> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PropConfig>) => response.ok),
                map((propConfig: HttpResponse<PropConfig>) => propConfig.body)
            );
        }
        return of(new PropConfig());
    }
}

export const propConfigRoute: Routes = [
    {
        path: '',
        component: PropConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PropConfigDetailComponent,
        resolve: {
            propConfig: PropConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PropConfigUpdateComponent,
        resolve: {
            propConfig: PropConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PropConfigUpdateComponent,
        resolve: {
            propConfig: PropConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const propConfigPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PropConfigDeletePopupComponent,
        resolve: {
            propConfig: PropConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.propConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
