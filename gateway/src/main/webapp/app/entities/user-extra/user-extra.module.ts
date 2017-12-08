import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    UserExtraComponent,
    UserExtraDeleteDialogComponent,
    UserExtraDeletePopupComponent,
    UserExtraDetailComponent,
    UserExtraDialogComponent,
    UserExtraPopupComponent,
    userExtraPopupRoute,
    UserExtraPopupService,
    userExtraRoute,
    UserExtraService,
} from './';

const ENTITY_STATES = [
    ...userExtraRoute,
    ...userExtraPopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        UserExtraComponent,
        UserExtraDetailComponent,
        UserExtraDialogComponent,
        UserExtraDeleteDialogComponent,
        UserExtraPopupComponent,
        UserExtraDeletePopupComponent,
    ],
    entryComponents: [
        UserExtraComponent,
        UserExtraDialogComponent,
        UserExtraPopupComponent,
        UserExtraDeleteDialogComponent,
        UserExtraDeletePopupComponent,
    ],
    providers: [
        UserExtraService,
        UserExtraPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryUserExtraModule {
}
