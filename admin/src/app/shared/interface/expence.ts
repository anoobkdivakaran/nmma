import { Member } from "./member";

export interface Expence {
        $key: string;
        expenceType: string;
        amount: string;
        memberKey: string;
        notes:string;
        createdOn:Date;
        createdBy:string
        updatedOn:Date;
        updatedBy:string
        isActive:boolean;
        member:Member
}
