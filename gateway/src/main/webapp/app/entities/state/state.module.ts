import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../../shared';
import {
    StateComponent,
    StateDeleteDialogComponent,
    StateDeletePopupComponent,
    StateDetailComponent,
    StateDialogComponent,
    StatePopupComponent,
    statePopupRoute,
    StatePopupService,
    stateRoute,
    StateService,
} from './';

const ENTITY_STATES = [
    ...stateRoute,
    ...statePopupRoute,
];

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        StateComponent,
        StateDetailComponent,
        StateDialogComponent,
        StateDeleteDialogComponent,
        StatePopupComponent,
        StateDeletePopupComponent,
    ],
    entryComponents: [
        StateComponent,
        StateDialogComponent,
        StatePopupComponent,
        StateDeleteDialogComponent,
        StateDeletePopupComponent,
    ],
    providers: [
        StateService,
        StatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryStateModule {
}
