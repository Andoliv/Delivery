import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {State} from './state.model';
import {StateService} from './state.service';
import {Principal, ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-state',
    templateUrl: './state.component.html'
})
export class StateComponent implements OnInit, OnDestroy {
    states: State[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private stateService: StateService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal) {
    }

    loadAll() {
        this.stateService.query().subscribe(
            (res: ResponseWrapper) => {
                this.states = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: State) {
        return item.id;
    }

    registerChangeInStates() {
        this.eventSubscriber = this.eventManager.subscribe('stateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
