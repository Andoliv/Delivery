import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager} from 'ng-jhipster';

import {DeliveryMan} from './delivery-man.model';
import {DeliveryManService} from './delivery-man.service';

@Component({
    selector: 'jhi-delivery-man-detail',
    templateUrl: './delivery-man-detail.component.html'
})
export class DeliveryManDetailComponent implements OnInit, OnDestroy {

    deliveryMan: DeliveryMan;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager,
                private deliveryManService: DeliveryManService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDeliveryMen();
    }

    load(id) {
        this.deliveryManService.find(id).subscribe((deliveryMan) => {
            this.deliveryMan = deliveryMan;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDeliveryMen() {
        this.eventSubscriber = this.eventManager.subscribe(
            'deliveryManListModification',
            (response) => this.load(this.deliveryMan.id)
        );
    }
}
