import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'image-base-64',
                loadChildren: './image-base-64/image-base-64.module#JhipsterImageBase64Module'
            },
            {
                path: 'blog',
                loadChildren: './blog/blog.module#JhipsterBlogModule'
            },
            {
                path: 'entry',
                loadChildren: './entry/entry.module#JhipsterEntryModule'
            },
            {
                path: 'tag',
                loadChildren: './tag/tag.module#JhipsterTagModule'
            },
            {
                path: 'prop-config',
                loadChildren: './prop-config/prop-config.module#JhipsterPropConfigModule'
            },
            {
                path: 'personne',
                loadChildren: './personne/personne.module#JhipsterPersonneModule'
            },
            {
                path: 'adresse',
                loadChildren: './adresse/adresse.module#JhipsterAdresseModule'
            },
            {
                path: 'device',
                loadChildren: './device/device.module#JhipsterDeviceModule'
            },
            {
                path: 'evenement',
                loadChildren: './evenement/evenement.module#JhipsterEvenementModule'
            },
            {
                path: 'participant',
                loadChildren: './participant/participant.module#JhipsterParticipantModule'
            },
            {
                path: 'commercant',
                loadChildren: './commercant/commercant.module#JhipsterCommercantModule'
            },
            {
                path: 'commercant-informations',
                loadChildren: './commercant-informations/commercant-informations.module#JhipsterCommercantInformationsModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterEntityModule {}
