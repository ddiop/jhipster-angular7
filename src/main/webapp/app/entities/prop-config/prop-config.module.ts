import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    PropConfigComponent,
    PropConfigDetailComponent,
    PropConfigUpdateComponent,
    PropConfigDeletePopupComponent,
    PropConfigDeleteDialogComponent,
    propConfigRoute,
    propConfigPopupRoute
} from './';

const ENTITY_STATES = [...propConfigRoute, ...propConfigPopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PropConfigComponent,
        PropConfigDetailComponent,
        PropConfigUpdateComponent,
        PropConfigDeleteDialogComponent,
        PropConfigDeletePopupComponent
    ],
    entryComponents: [PropConfigComponent, PropConfigUpdateComponent, PropConfigDeleteDialogComponent, PropConfigDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterPropConfigModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
