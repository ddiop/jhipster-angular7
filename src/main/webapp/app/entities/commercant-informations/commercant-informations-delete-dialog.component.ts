import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommercantInformations } from 'app/shared/model/commercant-informations.model';
import { CommercantInformationsService } from './commercant-informations.service';

@Component({
    selector: 'jhi-commercant-informations-delete-dialog',
    templateUrl: './commercant-informations-delete-dialog.component.html'
})
export class CommercantInformationsDeleteDialogComponent {
    commercantInformations: ICommercantInformations;

    constructor(
        protected commercantInformationsService: CommercantInformationsService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commercantInformationsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commercantInformationsListModification',
                content: 'Deleted an commercantInformations'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commercant-informations-delete-popup',
    template: ''
})
export class CommercantInformationsDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commercantInformations }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommercantInformationsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.commercantInformations = commercantInformations;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/commercant-informations', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/commercant-informations', { outlets: { popup: null } }]);
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
