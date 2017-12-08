import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    AccountService,
    AuthServerProvider,
    CSRFService,
    DeliverySharedCommonModule,
    DeliverySharedLibsModule,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    JhiTrackerService,
    LoginModalService,
    LoginService,
    Principal,
    StateStorageService,
    UserService,
} from './';

@NgModule({
    imports: [
        DeliverySharedLibsModule,
        DeliverySharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        DeliverySharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class DeliverySharedModule {
}
