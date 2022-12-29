import { Injectable } from '@angular/core';
import { Expence } from '../interface/expence';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudServiceExpence {
  expencesRef: AngularFireList<any>;
  expenceRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  AddExpence(expence: Expence) {
    this.expencesRef.push({
      expenceType:expence.expenceType,
      amount:expence.amount,
      memberKey:expence.memberKey,
      notes:expence.notes,
      createdOn:expence.createdOn,
      createdBy:expence.createdBy,
      updatedOn:expence.updatedOn,
      updatedBy:expence.updatedBy,
      isActive:expence.isActive
    });
  }
  GetExpence(id: string) {
    this.expenceRef = this.db.object('expences-list/' + id);
    return this.expenceRef;
  }
  GetExpenceList() {
    this.expencesRef = this.db.list('expences-list');
    return this.expencesRef;
  }
  UpdateExpence(expence: Expence) {
    this.expenceRef.update({
      expenceType:expence.expenceType,
      amount:expence.amount,
      memberKey:expence.memberKey,
      notes:expence.notes,
      createdOn:expence.createdOn,
      createdBy:expence.createdBy,
      updatedOn:expence.updatedOn,
      updatedBy:expence.updatedBy,
      isActive:expence.isActive
    });
  }
}