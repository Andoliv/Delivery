import {LOCALE_ID, NgModule} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {WindowRef} from './tracker/window.service';
import {
    DeliverySharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLanguageHelper
} from './';

@NgModule({
    imports: [
        DeliverySharedLibsModule
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        WindowRef,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'pt-br'
        },
    ],
    exports: [
        DeliverySharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class DeliverySharedCommonModule {
}
