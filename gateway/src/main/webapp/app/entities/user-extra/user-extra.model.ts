import {BaseEntity} from './../../shared';

export class UserExtra implements BaseEntity {
    constructor(public id?: number,
                public firstName?: string,
                public lastName?: string,
                public email?: string,
                public phoneNumber?: string,
                public comments?: string,
                public location?: BaseEntity,) {
    }
}
