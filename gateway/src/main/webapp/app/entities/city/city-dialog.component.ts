import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {City} from './city.model';
import {CityPopupService} from './city-popup.service';
import {CityService} from './city.service';
import {State, StateService} from '../state';
import {ResponseWrapper} from '../../shared';

@Component({
    selector: 'jhi-city-dialog',
    templateUrl: './city-dialog.component.html'
})
export class CityDialogComponent implements OnInit {

    city: City;
    isSaving: boolean;

    states: State[];

    constructor(public activeModal: NgbActiveModal,
                private jhiAlertService: JhiAlertService,
                private cityService: CityService,
                private stateService: StateService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stateService.query()
            .subscribe((res: ResponseWrapper) => {
                this.states = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city));
        }
    }

    trackStateById(index: number, item: State) {
        return item.id;
    }

    private subscribeToSaveResponse(result: Observable<City>) {
        result.subscribe((res: City) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: City) {
        this.eventManager.broadcast({name: 'cityListModification', content: 'OK'});
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
    selector: 'jhi-city-popup',
    template: ''
})
export class CityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private cityPopupService: CityPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.cityPopupService
                    .open(CityDialogComponent as Component, params['id']);
            } else {
                this.cityPopupService
                    .open(CityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
