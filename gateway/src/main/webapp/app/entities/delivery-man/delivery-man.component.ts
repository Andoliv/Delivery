import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {DeliveryMan} from './delivery-man.model';
import {DeliveryManService} from './delivery-man.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-delivery-man',
    templateUrl: './delivery-man.component.html'
})
export class DeliveryManComponent implements OnInit, OnDestroy {

    deliveryMen: DeliveryMan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;

    constructor(private deliveryManService: DeliveryManService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private parseLinks: JhiParseLinks,
                private principal: Principal) {
        this.deliveryMen = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.deliveryManService.query({
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
        this.deliveryMen = [];
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
        this.registerChangeInDeliveryMen();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DeliveryMan) {
        return item.id;
    }

    registerChangeInDeliveryMen() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryManListModification', (response) => this.reset());
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
            this.deliveryMen.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
