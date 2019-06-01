import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    EvenementComponent,
    EvenementDetailComponent,
    EvenementUpdateComponent,
    EvenementDeletePopupComponent,
    EvenementDeleteDialogComponent,
    evenementRoute,
    evenementPopupRoute
} from './';

const ENTITY_STATES = [...evenementRoute, ...evenementPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EvenementComponent,
        EvenementDetailComponent,
        EvenementUpdateComponent,
        EvenementDeleteDialogComponent,
        EvenementDeletePopupComponent
    ],
    entryComponents: [EvenementComponent, EvenementUpdateComponent, EvenementDeleteDialogComponent, EvenementDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEvenementModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
