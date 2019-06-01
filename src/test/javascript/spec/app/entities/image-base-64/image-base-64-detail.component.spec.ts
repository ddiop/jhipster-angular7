/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { ImageBase64DetailComponent } from 'app/entities/image-base-64/image-base-64-detail.component';
import { ImageBase64 } from 'app/shared/model/image-base-64.model';

describe('Component Tests', () => {
    describe('ImageBase64 Management Detail Component', () => {
        let comp: ImageBase64DetailComponent;
        let fixture: ComponentFixture<ImageBase64DetailComponent>;
        const route = ({ data: of({ imageBase64: new ImageBase64(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [ImageBase64DetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ImageBase64DetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ImageBase64DetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.imageBase64).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
