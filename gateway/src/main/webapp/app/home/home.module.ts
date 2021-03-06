import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {DeliverySharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';

@NgModule({
    imports: [
        DeliverySharedModule,
        RouterModule.forRoot([HOME_ROUTE], {useHash: true})
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryHomeModule {
}
