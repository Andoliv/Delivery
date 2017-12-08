import {BaseEntity} from './../../shared';

export class Client implements BaseEntity {
    constructor(public id?: number,
                public score?: number,
                public userExtra?: BaseEntity,) {
    }
}
