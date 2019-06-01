/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { PropConfigDetailComponent } from 'app/entities/prop-config/prop-config-detail.component';
import { PropConfig } from 'app/shared/model/prop-config.model';

describe('Component Tests', () => {
    describe('PropConfig Management Detail Component', () => {
        let comp: PropConfigDetailComponent;
        let fixture: ComponentFixture<PropConfigDetailComponent>;
        const route = ({ data: of({ propConfig: new PropConfig(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PropConfigDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PropConfigDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PropConfigDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.propConfig).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
