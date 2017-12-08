import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Delivery} from './delivery.model';
import {DeliveryPopupService} from './delivery-popup.service';
import {DeliveryService} from './delivery.service';
import {DeliveryMan, DeliveryManService} from '../delivery-man';
import {Client, ClientService} from '../client';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-delivery-dialog',
    templateUrl: './delivery-dialog.component.html'
})
export class DeliveryDialogComponent implements OnInit {

    delivery: Delivery;
    isSaving: boolean;

    deliverymen: DeliveryMan[];

    clients: Client[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private deliveryService: DeliveryService,
                private deliveryManService: DeliveryManService,
                private clientService: ClientService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.deliveryManService.query()
            .subscribe((res: ResponseWrapper) => {
                this.deliverymen = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => {
                this.clients = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.delivery.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deliveryService.update(this.delivery));
        } else {
            this.subscribeToSaveResponse(
                this.deliveryService.create(this.delivery));
        }
    }

    trackDeliveryManById(index: number, item: DeliveryMan) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<Delivery>) {
        result.subscribe((res: Delivery) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Delivery) {
        this.eventManager.broadcast({name: 'deliveryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-delivery-popup',
    template: ''
})
export class DeliveryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private deliveryPopupService: DeliveryPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.deliveryPopupService
                    .open(DeliveryDialogComponent as Component, params['id']);
            } else {
                this.deliveryPopupService
                    .open(DeliveryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
