import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {State} from './state.model';
import {StatePopupService} from './state-popup.service';
import {StateService} from './state.service';
import {Country, CountryService} from '../country';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-state-dialog',
    templateUrl: './state-dialog.component.html'
})
export class StateDialogComponent implements OnInit {

    state: State;
    isSaving: boolean;

    countries: Country[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private stateService: StateService,
                private countryService: CountryService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.countryService.query()
            .subscribe((res: ResponseWrapper) => {
                this.countries = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.state.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stateService.update(this.state));
        } else {
            this.subscribeToSaveResponse(
                this.stateService.create(this.state));
        }
    }

    trackCountryById(index: number, item: Country) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<State>) {
        result.subscribe((res: State) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: State) {
        this.eventManager.broadcast({name: 'stateListModification', content: 'OK'});
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
    selector: 'jhi-state-popup',
    template: ''
})
export class StatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private statePopupService: StatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.statePopupService
                    .open(StateDialogComponent as Component, params['id']);
            } else {
                this.statePopupService
                    .open(StateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
