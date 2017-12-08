/* tslint:disable max-line-length */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {JhiDataUtils, JhiDateUtils, JhiEventManager} from 'ng-jhipster';
import {DeliveryTestModule} from '../../../test.module';
import {MockActivatedRoute} from '../../../helpers/mock-route.service';
import {CityDetailComponent} from '../../../../../../main/webapp/app/entities/city/city-detail.component';
import {CityService} from '../../../../../../main/webapp/app/entities/city/city.service';
import {City} from '../../../../../../main/webapp/app/entities/city/city.model';

describe('Component Tests', () => {

    describe('City Management Detail Component', () => {
        let comp: CityDetailComponent;
        let fixture: ComponentFixture<CityDetailComponent>;
        let service: CityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DeliveryTestModule],
                declarations: [CityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CityService,
                    JhiEventManager
                ]
            }).overrideTemplate(CityDetailComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new City(10)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.city).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
