import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    CommercantComponent,
    CommercantDetailComponent,
    CommercantUpdateComponent,
    CommercantDeletePopupComponent,
    CommercantDeleteDialogComponent,
    commercantRoute,
    commercantPopupRoute
} from './';

const ENTITY_STATES = [...commercantRoute, ...commercantPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommercantComponent,
        CommercantDetailComponent,
        CommercantUpdateComponent,
        CommercantDeleteDialogComponent,
        CommercantDeletePopupComponent
    ],
    entryComponents: [CommercantComponent, CommercantUpdateComponent, CommercantDeleteDialogComponent, CommercantDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCommercantModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
