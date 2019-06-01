import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    PersonneComponent,
    PersonneDetailComponent,
    PersonneUpdateComponent,
    PersonneDeletePopupComponent,
    PersonneDeleteDialogComponent,
    personneRoute,
    personnePopupRoute
} from './';

const ENTITY_STATES = [...personneRoute, ...personnePopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonneComponent,
        PersonneDetailComponent,
        PersonneUpdateComponent,
        PersonneDeleteDialogComponent,
        PersonneDeletePopupComponent
    ],
    entryComponents: [PersonneComponent, PersonneUpdateComponent, PersonneDeleteDialogComponent, PersonneDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPersonneModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
