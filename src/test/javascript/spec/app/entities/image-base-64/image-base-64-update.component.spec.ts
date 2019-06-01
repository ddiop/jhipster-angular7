/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ImageBase64UpdateComponent } from 'app/entities/image-base-64/image-base-64-update.component';
import { ImageBase64Service } from 'app/entities/image-base-64/image-base-64.service';
import { ImageBase64 } from 'app/shared/model/image-base-64.model';

describe('Component Tests', () => {
    describe('ImageBase64 Management Update Component', () => {
        let comp: ImageBase64UpdateComponent;
        let fixture: ComponentFixture<ImageBase64UpdateComponent>;
        let service: ImageBase64Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ImageBase64UpdateComponent]
            })
                .overrideTemplate(ImageBase64UpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImageBase64UpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageBase64Service);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImageBase64(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imageBase64 = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ImageBase64();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.imageBase64 = entity;
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
