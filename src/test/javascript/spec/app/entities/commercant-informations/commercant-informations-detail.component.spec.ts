/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { CommercantInformationsDetailComponent } from 'app/entities/commercant-informations/commercant-informations-detail.component';
import { CommercantInformations } from 'app/shared/model/commercant-informations.model';

describe('Component Tests', () => {
    describe('CommercantInformations Management Detail Component', () => {
        let comp: CommercantInformationsDetailComponent;
        let fixture: ComponentFixture<CommercantInformationsDetailComponent>;
        const route = ({ data: of({ commercantInformations: new CommercantInformations(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [CommercantInformationsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CommercantInformationsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommercantInformationsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.commercantInformations).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
