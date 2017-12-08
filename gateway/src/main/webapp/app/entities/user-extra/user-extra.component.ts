import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {UserExtra} from './user-extra.model';
import {UserExtraService} from './user-extra.service';
import {Principal, ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-user-extra',
    templateUrl: './user-extra.component.html'
})
export class UserExtraComponent implements OnInit, OnDestroy {
    userExtras: UserExtra[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private userExtraService: UserExtraService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal) {
    }

    loadAll() {
        this.userExtraService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userExtras = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserExtras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UserExtra) {
        return item.id;
    }

    registerChangeInUserExtras() {
        this.eventSubscriber = this.eventManager.subscribe('userExtraListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
