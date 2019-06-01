/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { ImageBase64Component } from 'app/entities/image-base-64/image-base-64.component';
import { ImageBase64Service } from 'app/entities/image-base-64/image-base-64.service';
import { ImageBase64 } from 'app/shared/model/image-base-64.model';

describe('Component Tests', () => {
    describe('ImageBase64 Management Component', () => {
        let comp: ImageBase64Component;
        let fixture: ComponentFixture<ImageBase64Component>;
        let service: ImageBase64Service;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ImageBase64Component],
                providers: []
            })
                .overrideTemplate(ImageBase64Component, '')
                .compileComponents();

            fixture = TestBed.createComponent(ImageBase64Component);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImageBase64Service);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ImageBase64(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.imageBase64S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
