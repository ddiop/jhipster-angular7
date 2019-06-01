import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImageBase64 } from 'app/shared/model/image-base-64.model';
import { ImageBase64Service } from './image-base-64.service';

@Component({
    selector: 'jhi-image-base-64-delete-dialog',
    templateUrl: './image-base-64-delete-dialog.component.html'
})
export class ImageBase64DeleteDialogComponent {
    imageBase64: IImageBase64;

    constructor(
        protected imageBase64Service: ImageBase64Service,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.imageBase64Service.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'imageBase64ListModification',
                content: 'Deleted an imageBase64'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-image-base-64-delete-popup',
    template: ''
})
export class ImageBase64DeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imageBase64 }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ImageBase64DeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.imageBase64 = imageBase64;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/image-base-64', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/image-base-64', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
