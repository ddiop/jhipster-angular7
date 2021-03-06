/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { CommercantInformationsDeleteDialogComponent } from 'app/entities/commercant-informations/commercant-informations-delete-dialog.component';
import { CommercantInformationsService } from 'app/entities/commercant-informations/commercant-informations.service';

describe('Component Tests', () => {
    describe('CommercantInformations Management Delete Component', () => {
        let comp: CommercantInformationsDeleteDialogComponent;
        let fixture: ComponentFixture<CommercantInformationsDeleteDialogComponent>;
        let service: CommercantInformationsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CommercantInformationsDeleteDialogComponent]
            })
                .overrideTemplate(CommercantInformationsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommercantInformationsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommercantInformationsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
