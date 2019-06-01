import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';

@Component({
    selector: 'jhi-commercant-informations-detail',
    templateUrl: './commercant-informations-detail.component.html'
})
export class CommercantInformationsDetailComponent implements OnInit {
    commercantInformations: ICommercantInformations;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commercantInformations }) => {
            this.commercantInformations = commercantInformations;
        });
    }

    previousState() {
        window.history.back();
    }
}
