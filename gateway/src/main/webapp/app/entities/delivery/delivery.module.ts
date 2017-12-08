import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    DeliveryComponent,
    DeliveryDeleteDialogComponent,
    DeliveryDeletePopupComponent,
    DeliveryDetailComponent,
    DeliveryDialogComponent,
    DeliveryPopupComponent,
    deliveryPopupRoute,
    DeliveryPopupService,
    deliveryRoute,
    DeliveryService,
} from './';

const ENTITY_STATES = [
    ...deliveryRoute,
    ...deliveryPopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        DeliveryComponent,
        DeliveryDetailComponent,
        DeliveryDialogComponent,
        DeliveryDeleteDialogComponent,
        DeliveryPopupComponent,
        DeliveryDeletePopupComponent,
    ],
    entryComponents: [
        DeliveryComponent,
        DeliveryDialogComponent,
        DeliveryPopupComponent,
        DeliveryDeleteDialogComponent,
        DeliveryDeletePopupComponent,
    ],
    providers: [
        DeliveryService,
        DeliveryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryDeliveryModule {
}
