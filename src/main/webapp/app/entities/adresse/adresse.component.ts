import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAdresse } from 'app/shared/model/adresse.model';
import { AccountService } from 'app/core';
import { AdresseService } from './adresse.service';

@Component({
    selector: 'jhi-adresse',
    templateUrl: './adresse.component.html'
})
export class AdresseComponent implements OnInit, OnDestroy {
    adresses: IAdresse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected adresseService: AdresseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.adresseService
            .query()
            .pipe(
                filter((res: HttpResponse<IAdresse[]>) => res.ok),
                map((res: HttpResponse<IAdresse[]>) => res.body)
            )
            .subscribe(
                (res: IAdresse[]) => {
                    this.adresses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAdresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAdresse) {
        return item.id;
    }

    registerChangeInAdresses() {
        this.eventSubscriber = this.eventManager.subscribe('adresseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
