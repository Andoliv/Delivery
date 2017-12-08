import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    CountryComponent,
    CountryDeleteDialogComponent,
    CountryDeletePopupComponent,
    CountryDetailComponent,
    CountryDialogComponent,
    CountryPopupComponent,
    countryPopupRoute,
    CountryPopupService,
    countryRoute,
    CountryService,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        CountryComponent,
        CountryDetailComponent,
        CountryDialogComponent,
        CountryDeleteDialogComponent,
        CountryPopupComponent,
        CountryDeletePopupComponent,
    ],
    entryComponents: [
        CountryComponent,
        CountryDialogComponent,
        CountryPopupComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
    ],
    providers: [
        CountryService,
        CountryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryCountryModule {
}
