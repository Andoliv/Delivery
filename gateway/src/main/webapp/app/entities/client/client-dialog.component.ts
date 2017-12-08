import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Client} from './client.model';
import {ClientPopupService} from './client-popup.service';
import {ClientService} from './client.service';
import {UserExtra, UserExtraService} from '../user-extra';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-client-dialog',
    templateUrl: './client-dialog.component.html'
})
export class ClientDialogComponent implements OnInit {

    client: Client;
    isSaving: boolean;

    userextras: UserExtra[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private clientService: ClientService,
                private userExtraService: UserExtraService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userExtraService
            .query({filter: 'client-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.client.userExtra || !this.client.userExtra.id) {
                    this.userextras = res.json;
                } else {
                    this.userExtraService
                        .find(this.client.userExtra.id)
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
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(
                this.clientService.create(this.client));
        }
    }

    trackUserExtraById(index: number, item: UserExtra) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<Client>) {
        result.subscribe((res: Client) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Client) {
        this.eventManager.broadcast({name: 'clientListModification', content: 'OK'});
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
    selector: 'jhi-client-popup',
    template: ''
})
export class ClientPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private clientPopupService: ClientPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.clientPopupService
                    .open(ClientDialogComponent as Component, params['id']);
            } else {
                this.clientPopupService
                    .open(ClientDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
