import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IEvenement } from 'app/shared/model/evenement.model';
import { EvenementService } from './evenement.service';
import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from 'app/entities/commercant';

@Component({
    selector: 'jhi-evenement-update',
    templateUrl: './evenement-update.component.html'
})
export class EvenementUpdateComponent implements OnInit {
    evenement: IEvenement;
    isSaving: boolean;

    commercants: ICommercant[];
    dateDepartDp: any;
    dateRetourDp: any;
    dateReflexionDp: any;
    dateCreationDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected evenementService: EvenementService,
        protected commercantService: CommercantService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ evenement }) => {
            this.evenement = evenement;
        });
        this.commercantService
            .query({ filter: 'evenement-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICommercant[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICommercant[]>) => response.body)
            )
            .subscribe(
                (res: ICommercant[]) => {
                    if (!this.evenement.commercant || !this.evenement.commercant.id) {
                        this.commercants = res;
                    } else {
                        this.commercantService
                            .find(this.evenement.commercant.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICommercant>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICommercant>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICommercant) => (this.commercants = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.evenement.id !== undefined) {
            this.subscribeToSaveResponse(this.evenementService.update(this.evenement));
        } else {
            this.subscribeToSaveResponse(this.evenementService.create(this.evenement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvenement>>) {
        result.subscribe((res: HttpResponse<IEvenement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCommercantById(index: number, item: ICommercant) {
        return item.id;
    }
}
