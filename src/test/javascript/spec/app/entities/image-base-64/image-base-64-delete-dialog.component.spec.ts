/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestModule } from '../../../test.module';
import { ImageBase64DeleteDialogComponent } from 'app/entities/image-base-64/image-base-64-delete-dialog.component';
import { ImageBase64Service } from 'app/entities/image-base-64/image-base-64.service';

describe('Component Tests', () => {
    describe('ImageBase64 Management Delete Component', () => {
        let comp: ImageBase64DeleteDialogComponent;
        let fixture: ComponentFixture<ImageBase64DeleteDialogComponent>;
        let service: ImageBase64Service;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ImageBase64DeleteDialogComponent]
            })
                .overrideTemplate(ImageBase64DeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImageBase64DeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageBase64Service);
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
