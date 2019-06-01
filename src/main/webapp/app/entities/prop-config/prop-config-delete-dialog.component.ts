import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPropConfig } from 'app/shared/model/prop-config.model';
import { PropConfigService } from './prop-config.service';

@Component({
    selector: 'jhi-prop-config-delete-dialog',
    templateUrl: './prop-config-delete-dialog.component.html'
})
export class PropConfigDeleteDialogComponent {
    propConfig: IPropConfig;

    constructor(
        protected propConfigService: PropConfigService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.propConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'propConfigListModification',
                content: 'Deleted an propConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prop-config-delete-popup',
    template: ''
})
export class PropConfigDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ propConfig }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PropConfigDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.propConfig = propConfig;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/prop-config', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/prop-config', { outlets: { popup: null } }]);
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
