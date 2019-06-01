import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IPersonne } from 'app/shared/model/personne.model';
import { PersonneService } from './personne.service';
import { IAdresse } from 'app/shared/model/adresse.model';
import { AdresseService } from 'app/entities/adresse';
import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from 'app/entities/device';

@Component({
    selector: 'jhi-personne-update',
    templateUrl: './personne-update.component.html'
})
export class PersonneUpdateComponent implements OnInit {
    personne: IPersonne;
    isSaving: boolean;

    adresseresidences: IAdresse[];

    devices: IDevice[];
    dateNaissanceDp: any;
    cguDateValidationDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected personneService: PersonneService,
        protected adresseService: AdresseService,
        protected deviceService: DeviceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ personne }) => {
            this.personne = personne;
        });
        this.adresseService
            .query({ filter: 'personne-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAdresse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAdresse[]>) => response.body)
            )
            .subscribe(
                (res: IAdresse[]) => {
                    if (!this.personne.adresseResidence || !this.personne.adresseResidence.id) {
                        this.adresseresidences = res;
                    } else {
                        this.adresseService
                            .find(this.personne.adresseResidence.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAdresse>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAdresse>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAdresse) => (this.adresseresidences = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.deviceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDevice[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDevice[]>) => response.body)
            )
            .subscribe((res: IDevice[]) => (this.devices = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.personne.id !== undefined) {
            this.subscribeToSaveResponse(this.personneService.update(this.personne));
        } else {
            this.subscribeToSaveResponse(this.personneService.create(this.personne));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonne>>) {
        result.subscribe((res: HttpResponse<IPersonne>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAdresseById(index: number, item: IAdresse) {
        return item.id;
    }

    trackDeviceById(index: number, item: IDevice) {
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
