/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterTestModule } from '../../../test.module';
import { AdresseComponent } from 'app/entities/adresse/adresse.component';
import { AdresseService } from 'app/entities/adresse/adresse.service';
import { Adresse } from 'app/shared/model/adresse.model';

describe('Component Tests', () => {
    describe('Adresse Management Component', () => {
        let comp: AdresseComponent;
        let fixture: ComponentFixture<AdresseComponent>;
        let service: AdresseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [AdresseComponent],
                providers: []
            })
                .overrideTemplate(AdresseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AdresseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AdresseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Adresse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.adresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
