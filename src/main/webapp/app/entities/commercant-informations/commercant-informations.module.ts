import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    CommercantInformationsComponent,
    CommercantInformationsDetailComponent,
    CommercantInformationsUpdateComponent,
    CommercantInformationsDeletePopupComponent,
    CommercantInformationsDeleteDialogComponent,
    commercantInformationsRoute,
    commercantInformationsPopupRoute
} from './';

const ENTITY_STATES = [...commercantInformationsRoute, ...commercantInformationsPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommercantInformationsComponent,
        CommercantInformationsDetailComponent,
        CommercantInformationsUpdateComponent,
        CommercantInformationsDeleteDialogComponent,
        CommercantInformationsDeletePopupComponent
    ],
    entryComponents: [
        CommercantInformationsComponent,
        CommercantInformationsUpdateComponent,
        CommercantInformationsDeleteDialogComponent,
        CommercantInformationsDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterCommercantInformationsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
