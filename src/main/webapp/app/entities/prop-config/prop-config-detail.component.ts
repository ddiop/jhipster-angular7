import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPropConfig } from 'app/shared/model/prop-config.model';

@Component({
    selector: 'jhi-prop-config-detail',
    templateUrl: './prop-config-detail.component.html'
})
export class PropConfigDetailComponent implements OnInit {
    propConfig: IPropConfig;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propConfig }) => {
            this.propConfig = propConfig;
        });
    }

    previousState() {
        window.history.back();
    }
}
