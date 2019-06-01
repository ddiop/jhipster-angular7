import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from './device.service';
import { IPersonne } from 'app/shared/model/personne.model';
import { PersonneService } from 'app/entities/personne';

@Component({
    selector: 'jhi-device-update',
    templateUrl: './device-update.component.html'
})
export class DeviceUpdateComponent implements OnInit {
    device: IDevice;
    isSaving: boolean;

    personnes: IPersonne[];
    activationDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deviceService: DeviceService,
        protected personneService: PersonneService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ device }) => {
            this.device = device;
            this.activationDate = this.device.activationDate != null ? this.device.activationDate.format(DATE_TIME_FORMAT) : null;
        });
        this.personneService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPersonne[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPersonne[]>) => response.body)
            )
            .subscribe((res: IPersonne[]) => (this.personnes = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.device.activationDate = this.activationDate != null ? moment(this.activationDate, DATE_TIME_FORMAT) : null;
        if (this.device.id !== undefined) {
            this.subscribeToSaveResponse(this.deviceService.update(this.device));
        } else {
            this.subscribeToSaveResponse(this.deviceService.create(this.device));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevice>>) {
        result.subscribe((res: HttpResponse<IDevice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonneById(index: number, item: IPersonne) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
