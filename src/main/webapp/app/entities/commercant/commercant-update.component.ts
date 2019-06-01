import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';

@Component({
    selector: 'jhi-commercant-update',
    templateUrl: './commercant-update.component.html'
})
export class CommercantUpdateComponent implements OnInit {
    commercant: ICommercant;
    isSaving: boolean;

    constructor(protected commercantService: CommercantService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commercant }) => {
            this.commercant = commercant;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.commercant.id !== undefined) {
            this.subscribeToSaveResponse(this.commercantService.update(this.commercant));
        } else {
            this.subscribeToSaveResponse(this.commercantService.create(this.commercant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommercant>>) {
        result.subscribe((res: HttpResponse<ICommercant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
