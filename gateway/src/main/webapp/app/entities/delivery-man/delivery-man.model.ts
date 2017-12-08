import {BaseEntity} from './../../shared';

export class DeliveryMan implements BaseEntity {
    constructor(public id?: number,
                public salary?: string,
                public userExtra?: BaseEntity,) {
    }
}
