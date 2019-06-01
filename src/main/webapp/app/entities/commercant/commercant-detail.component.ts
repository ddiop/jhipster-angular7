import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommercant } from 'app/shared/model/commercant.model';

@Component({
    selector: 'jhi-commercant-detail',
    templateUrl: './commercant-detail.component.html'
})
export class CommercantDetailComponent implements OnInit {
    commercant: ICommercant;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commercant }) => {
            this.commercant = commercant;
        });
    }

    previousState() {
        window.history.back();
    }
}
