/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterTestModule } from '../../../test.module';
import { PropConfigUpdateComponent } from 'app/entities/prop-config/prop-config-update.component';
import { PropConfigService } from 'app/entities/prop-config/prop-config.service';
import { PropConfig } from 'app/shared/model/prop-config.model';

describe('Component Tests', () => {
    describe('PropConfig Management Update Component', () => {
        let comp: PropConfigUpdateComponent;
        let fixture: ComponentFixture<PropConfigUpdateComponent>;
        let service: PropConfigService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterTestModule],
                declarations: [PropConfigUpdateComponent]
            })
                .overrideTemplate(PropConfigUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PropConfigUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PropConfigService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PropConfig(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.propConfig = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new PropConfig();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.propConfig = entity;
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
