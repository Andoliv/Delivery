import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {DeliveryUserExtraModule} from './user-extra/user-extra.module';
import {DeliveryDeliveryManModule} from './delivery-man/delivery-man.module';
import {DeliveryClientModule} from './client/client.module';
import {DeliveryLocationModule} from './location/location.module';
import {DeliveryCountryModule} from './country/country.module';
import {DeliveryStateModule} from './state/state.module';
import {DeliveryCityModule} from './city/city.module';
import {DeliveryDeliveryModule} from './delivery/delivery.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DeliveryUserExtraModule,
        DeliveryDeliveryManModule,
        DeliveryClientModule,
        DeliveryLocationModule,
        DeliveryCountryModule,
        DeliveryStateModule,
        DeliveryCityModule,
        DeliveryDeliveryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DeliveryEntityModule {
}
