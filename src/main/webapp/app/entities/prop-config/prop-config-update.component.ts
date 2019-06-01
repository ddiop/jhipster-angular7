import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPropConfig } from 'app/shared/model/prop-config.model';
import { PropConfigService } from './prop-config.service';

@Component({
    selector: 'jhi-prop-config-update',
    templateUrl: './prop-config-update.component.html'
})
export class PropConfigUpdateComponent implements OnInit {
    propConfig: IPropConfig;
    isSaving: boolean;

    constructor(protected propConfigService: PropConfigService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ propConfig }) => {
            this.propConfig = propConfig;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.propConfig.id !== undefined) {
            this.subscribeToSaveResponse(this.propConfigService.update(this.propConfig));
        } else {
            this.subscribeToSaveResponse(this.propConfigService.create(this.propConfig));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPropConfig>>) {
        result.subscribe((res: HttpResponse<IPropConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
