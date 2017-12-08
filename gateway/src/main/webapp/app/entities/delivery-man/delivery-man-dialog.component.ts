import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {DeliveryMan} from './delivery-man.model';
import {DeliveryManPopupService} from './delivery-man-popup.service';
import {DeliveryManService} from './delivery-man.service';
import {UserExtra, UserExtraService} from '../user-extra';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-delivery-man-dialog',
    templateUrl: './delivery-man-dialog.component.html'
})
export class DeliveryManDialogComponent implements OnInit {

    deliveryMan: DeliveryMan;
    isSaving: boolean;

    userextras: UserExtra[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private deliveryManService: DeliveryManService,
                private userExtraService: UserExtraService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userExtraService
            .query({filter: 'deliveryman-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.deliveryMan.userExtra || !this.deliveryMan.userExtra.id) {
                    this.userextras = res.json;
                } else {
                    this.userExtraService
                        .find(this.deliveryMan.userExtra.id)
                        .subscribe((subRes: UserExtra) => {
                            this.userextras = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.deliveryMan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.deliveryManService.update(this.deliveryMan));
        } else {
            this.subscribeToSaveResponse(
                this.deliveryManService.create(this.deliveryMan));
        }
    }

    trackUserExtraById(index: number, item: UserExtra) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<DeliveryMan>) {
        result.subscribe((res: DeliveryMan) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DeliveryMan) {
        this.eventManager.broadcast({name: 'deliveryManListModification', content: 'OK'});
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
    selector: 'jhi-delivery-man-popup',
    template: ''
})
export class DeliveryManPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private deliveryManPopupService: DeliveryManPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.deliveryManPopupService
                    .open(DeliveryManDialogComponent as Component, params['id']);
            } else {
                this.deliveryManPopupService
                    .open(DeliveryManDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
