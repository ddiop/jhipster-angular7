/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CommercantInformationsUpdateComponent } from 'app/entities/commercant-informations/commercant-informations-update.component';
import { CommercantInformationsService } from 'app/entities/commercant-informations/commercant-informations.service';
import { CommercantInformations } from 'app/shared/model/commercant-informations.model';

describe('Component Tests', () => {
    describe('CommercantInformations Management Update Component', () => {
        let comp: CommercantInformationsUpdateComponent;
        let fixture: ComponentFixture<CommercantInformationsUpdateComponent>;
        let service: CommercantInformationsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CommercantInformationsUpdateComponent]
            })
                .overrideTemplate(CommercantInformationsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommercantInformationsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommercantInformationsService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new CommercantInformations(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commercantInformations = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new CommercantInformations();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commercantInformations = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
