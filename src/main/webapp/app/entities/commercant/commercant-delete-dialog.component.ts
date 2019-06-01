import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommercant } from 'app/shared/model/commercant.model';
import { CommercantService } from './commercant.service';

@Component({
    selector: 'jhi-commercant-delete-dialog',
    templateUrl: './commercant-delete-dialog.component.html'
})
export class CommercantDeleteDialogComponent {
    commercant: ICommercant;

    constructor(
        protected commercantService: CommercantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commercantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'commercantListModification',
                content: 'Deleted an commercant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-commercant-delete-popup',
    template: ''
})
export class CommercantDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ commercant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CommercantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.commercant = commercant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/commercant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/commercant', { outlets: { popup: null } }]);
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
