import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    DeliveryManComponent,
    DeliveryManDeleteDialogComponent,
    DeliveryManDeletePopupComponent,
    DeliveryManDetailComponent,
    DeliveryManDialogComponent,
    DeliveryManPopupComponent,
    deliveryManPopupRoute,
    DeliveryManPopupService,
    deliveryManRoute,
    DeliveryManService,
} from './';

const ENTITY_STATES = [
    ...deliveryManRoute,
    ...deliveryManPopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        DeliveryManComponent,
        DeliveryManDetailComponent,
        DeliveryManDialogComponent,
        DeliveryManDeleteDialogComponent,
        DeliveryManPopupComponent,
        DeliveryManDeletePopupComponent,
    ],
    entryComponents: [
        DeliveryManComponent,
        DeliveryManDialogComponent,
        DeliveryManPopupComponent,
        DeliveryManDeleteDialogComponent,
        DeliveryManDeletePopupComponent,
    ],
    providers: [
        DeliveryManService,
        DeliveryManPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryDeliveryManModule {
}
