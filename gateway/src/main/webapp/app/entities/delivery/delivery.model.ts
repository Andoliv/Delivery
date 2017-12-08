import {BaseEntity} from './../../shared';

export class Delivery implements BaseEntity {
    constructor(public id?: number,
                public title?: string,
                public description?: string,
                public value?: number,
                public expectedDistance?: number,
                public travelledDistance?: number,
                public expectedCost?: number,
                public totalCost?: number,
                public deliveryQuality?: string,
                public paymentQuality?: string,
                public expectedTime?: number,
                public deliveryTime?: number,
                public deliveryMan?: BaseEntity,
                public client?: BaseEntity,) {
    }
}
