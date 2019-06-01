/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CommercantUpdateComponent } from 'app/entities/commercant/commercant-update.component';
import { CommercantService } from 'app/entities/commercant/commercant.service';
import { Commercant } from 'app/shared/model/commercant.model';

describe('Component Tests', () => {
    describe('Commercant Management Update Component', () => {
        let comp: CommercantUpdateComponent;
        let fixture: ComponentFixture<CommercantUpdateComponent>;
        let service: CommercantService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CommercantUpdateComponent]
            })
                .overrideTemplate(CommercantUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommercantUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommercantService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commercant(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commercant = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Commercant();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.commercant = entity;
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
