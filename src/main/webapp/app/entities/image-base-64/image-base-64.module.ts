import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSharedModule } from 'app/shared';
import {
    ImageBase64Component,
    ImageBase64DetailComponent,
    ImageBase64UpdateComponent,
    ImageBase64DeletePopupComponent,
    ImageBase64DeleteDialogComponent,
    imageBase64Route,
    imageBase64PopupRoute
} from './';

const ENTITY_STATES = [...imageBase64Route, ...imageBase64PopupRoute];

@NgModule({
    imports: [JhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ImageBase64Component,
        ImageBase64DetailComponent,
        ImageBase64UpdateComponent,
        ImageBase64DeleteDialogComponent,
        ImageBase64DeletePopupComponent
    ],
    entryComponents: [ImageBase64Component, ImageBase64UpdateComponent, ImageBase64DeleteDialogComponent, ImageBase64DeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterImageBase64Module {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
