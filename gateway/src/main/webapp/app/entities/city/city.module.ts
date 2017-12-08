import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    CityComponent,
    CityDeleteDialogComponent,
    CityDeletePopupComponent,
    CityDetailComponent,
    CityDialogComponent,
    CityPopupComponent,
    cityPopupRoute,
    CityPopupService,
    cityRoute,
    CityService,
} from './';

const ENTITY_STATES = [
    ...cityRoute,
    ...cityPopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        CityComponent,
        CityDetailComponent,
        CityDialogComponent,
        CityDeleteDialogComponent,
        CityPopupComponent,
        CityDeletePopupComponent,
    ],
    entryComponents: [
        CityComponent,
        CityDialogComponent,
        CityPopupComponent,
        CityDeleteDialogComponent,
        CityDeletePopupComponent,
    ],
    providers: [
        CityService,
        CityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryCityModule {
}
