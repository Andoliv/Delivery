import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';

import {DeliveryManComponent} from './delivery-man.component';
import {DeliveryManDetailComponent} from './delivery-man-detail.component';
import {DeliveryManPopupComponent} from './delivery-man-dialog.component';
import {DeliveryManDeletePopupComponent} from './delivery-man-delete-dialog.component';

export const deliveryManRoute: Routes = [
    {
        path: 'delivery-man',
        component: DeliveryManComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deliveryApp.deliveryMan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delivery-man/:id',
        component: DeliveryManDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deliveryApp.deliveryMan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryManPopupRoute: Routes = [
    {
        path: 'delivery-man-new',
        component: DeliveryManPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deliveryApp.deliveryMan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-man/:id/edit',
        component: DeliveryManPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deliveryApp.deliveryMan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delivery-man/:id/delete',
        component: DeliveryManDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'deliveryApp.deliveryMan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
