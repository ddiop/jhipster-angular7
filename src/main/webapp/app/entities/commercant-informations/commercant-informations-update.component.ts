import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';
import { CommercantInformationsService } from './commercant-informations.service';
import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from 'app/entities/commercant';

@Component({
    selector: 'jhi-commercant-informations-update',
    templateUrl: './commercant-informations-update.component.html'
})
export class CommercantInformationsUpdateComponent implements OnInit {
    commercantInformations: ICommercantInformations;
    isSaving: boolean;

    commercants: ICommercant[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commercantInformationsService: CommercantInformationsService,
        protected commercantService: CommercantService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commercantInformations }) => {
            this.commercantInformations = commercantInformations;
        });
        this.commercantService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICommercant[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICommercant[]>) => response.body)
            )
            .subscribe((res: ICommercant[]) => (this.commercants = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.commercantInformations.id !== undefined) {
            this.subscribeToSaveResponse(this.commercantInformationsService.update(this.commercantInformations));
        } else {
            this.subscribeToSaveResponse(this.commercantInformationsService.create(this.commercantInformations));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommercantInformations>>) {
        result.subscribe(
            (res: HttpResponse<ICommercantInformations>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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
