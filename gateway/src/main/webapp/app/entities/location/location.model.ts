import {BaseEntity} from './../../shared';

export class Location implements BaseEntity {
    constructor(public id?: number,
                public streetAddress?: string,
                public numberAddress?: number,
                public neighborhood?: string,
                public postalCode?: string,
                public city?: BaseEntity,) {
    }
}
