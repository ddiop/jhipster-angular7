import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IImageBase64 } from 'app/shared/model/image-base-64.model';

@Component({
    selector: 'jhi-image-base-64-detail',
    templateUrl: './image-base-64-detail.component.html'
})
export class ImageBase64DetailComponent implements OnInit {
    imageBase64: IImageBase64;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imageBase64 }) => {
            this.imageBase64 = imageBase64;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
