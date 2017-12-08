import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {DeliveryMan} from './delivery-man.model';
import {DeliveryManService} from './delivery-man.service';

@Injectable()
export class DeliveryManPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal,
                private router: Router,
                private deliveryManService: DeliveryManService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.deliveryManService.find(id).subscribe((deliveryMan) => {
                    this.ngbModalRef = this.deliveryManModalRef(component, deliveryMan);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.deliveryManModalRef(component, new DeliveryMan());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    deliveryManModalRef(component: Component, deliveryMan: DeliveryMan): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.deliveryMan = deliveryMan;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
