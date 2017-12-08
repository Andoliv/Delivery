import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Delivery} from './delivery.model';
import {DeliveryService} from './delivery.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-delivery',
    templateUrl: './delivery.component.html'
})
export class DeliveryComponent implements OnInit, OnDestroy {

    deliveries: Delivery[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(private deliveryService: DeliveryService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private parseLinks: JhiParseLinks,
                private principal: Principal) {
        this.deliveries = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.deliveryService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.deliveries = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDeliveries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Delivery) {
        return item.id;
    }

    registerChangeInDeliveries() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.deliveries.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
