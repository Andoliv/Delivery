import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {DeliverySharedModule, UserRouteAccessService} from './shared';
import {DeliveryHomeModule} from './home/home.module';
import {DeliveryAdminModule} from './admin/admin.module';
import {DeliveryAccountModule} from './account/account.module';
import {DeliveryEntityModule} from './entities/entity.module';

import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';

// jhipster-needle-angular-add-module-import JHipster will add new module here

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        DeliverySharedModule,
        DeliveryHomeModule,
        DeliveryAdminModule,
        DeliveryAccountModule,
        DeliveryEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class DeliveryAppModule {
}
