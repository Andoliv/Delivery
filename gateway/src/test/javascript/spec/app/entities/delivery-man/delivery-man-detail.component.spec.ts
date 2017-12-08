/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {JhiDataUtils, JhiDateUtils, JhiEventManager} from 'ng-jhipster';
import {DeliveryTestModule} from '../../../test.module';
import {MockActivatedRoute} from '../../../helpers/mock-route.service';
import {DeliveryManDetailComponent} from '../../../../../../main/webapp/app/entities/delivery-man/delivery-man-detail.component';
import {DeliveryManService} from '../../../../../../main/webapp/app/entities/delivery-man/delivery-man.service';
import {DeliveryMan} from '../../../../../../main/webapp/app/entities/delivery-man/delivery-man.model';

describe('Component Tests', () => {

    describe('DeliveryMan Management Detail Component', () => {
        let comp: DeliveryManDetailComponent;
        let fixture: ComponentFixture<DeliveryManDetailComponent>;
        let service: DeliveryManService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeliveryTestModule],
                declarations: [DeliveryManDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DeliveryManService,
                    JhiEventManager
                ]
            }).overrideTemplate(DeliveryManDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeliveryManDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryManService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new DeliveryMan(10)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.deliveryMan).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
