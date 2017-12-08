import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {DeliveryMan} from './delivery-man.model';
import {DeliveryManPopupService} from './delivery-man-popup.service';
import {DeliveryManService} from './delivery-man.service';

@Component({
    selector: 'jhi-delivery-man-delete-dialog',
    templateUrl: './delivery-man-delete-dialog.component.html'
})
export class DeliveryManDeleteDialogComponent {

    deliveryMan: DeliveryMan;

    constructor(private deliveryManService: DeliveryManService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryManService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'deliveryManListModification',
                content: 'Deleted an deliveryMan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-man-delete-popup',
    template: ''
})
export class DeliveryManDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private deliveryManPopupService: DeliveryManPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.deliveryManPopupService
                .open(DeliveryManDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
