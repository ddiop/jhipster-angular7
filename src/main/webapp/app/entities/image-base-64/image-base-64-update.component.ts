import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiDataUtils } from 'ng-jhipster';
import { IImageBase64 } from 'app/shared/model/image-base-64.model';
import { ImageBase64Service } from './image-base-64.service';

@Component({
    selector: 'jhi-image-base-64-update',
    templateUrl: './image-base-64-update.component.html'
})
export class ImageBase64UpdateComponent implements OnInit {
    imageBase64: IImageBase64;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected imageBase64Service: ImageBase64Service,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.imageBase64.id !== undefined) {
            this.subscribeToSaveResponse(this.imageBase64Service.update(this.imageBase64));
        } else {
            this.subscribeToSaveResponse(this.imageBase64Service.create(this.imageBase64));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImageBase64>>) {
        result.subscribe((res: HttpResponse<IImageBase64>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
