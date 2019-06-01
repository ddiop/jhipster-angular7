import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ImageBase64 } from 'app/shared/model/image-base-64.model';
import { ImageBase64Service } from './image-base-64.service';
import { ImageBase64Component } from './image-base-64.component';
import { ImageBase64DetailComponent } from './image-base-64-detail.component';
import { ImageBase64UpdateComponent } from './image-base-64-update.component';
import { ImageBase64DeletePopupComponent } from './image-base-64-delete-dialog.component';
import { IImageBase64 } from 'app/shared/model/image-base-64.model';

@Injectable({ providedIn: 'root' })
export class ImageBase64Resolve implements Resolve<IImageBase64> {
    constructor(private service: ImageBase64Service) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImageBase64> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ImageBase64>) => response.ok),
                map((imageBase64: HttpResponse<ImageBase64>) => imageBase64.body)
            );
        }
        return of(new ImageBase64());
    }
}

export const imageBase64Route: Routes = [
    {
        path: '',
        component: ImageBase64Component,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.imageBase64.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ImageBase64DetailComponent,
        resolve: {
            imageBase64: ImageBase64Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.imageBase64.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ImageBase64UpdateComponent,
        resolve: {
            imageBase64: ImageBase64Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.imageBase64.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ImageBase64UpdateComponent,
        resolve: {
            imageBase64: ImageBase64Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.imageBase64.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const imageBase64PopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ImageBase64DeletePopupComponent,
        resolve: {
            imageBase64: ImageBase64Resolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterApp.imageBase64.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
