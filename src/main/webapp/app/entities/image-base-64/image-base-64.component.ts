import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IImageBase64 } from 'app/shared/model/image-base-64.model';
import { AccountService } from 'app/core';
import { ImageBase64Service } from './image-base-64.service';

@Component({
    selector: 'jhi-image-base-64',
    templateUrl: './image-base-64.component.html'
})
export class ImageBase64Component implements OnInit, OnDestroy {
    imageBase64S: IImageBase64[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected imageBase64Service: ImageBase64Service,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.imageBase64Service
            .query()
            .pipe(
                filter((res: HttpResponse<IImageBase64[]>) => res.ok),
                map((res: HttpResponse<IImageBase64[]>) => res.body)
            )
            .subscribe(
                (res: IImageBase64[]) => {
                    this.imageBase64S = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInImageBase64S();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IImageBase64) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInImageBase64S() {
        this.eventSubscriber = this.eventManager.subscribe('imageBase64ListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
