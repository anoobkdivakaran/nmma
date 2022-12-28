import { Injectable } from '@angular/core';
import { Member } from '../shared/member';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  membersRef: AngularFireList<any>;
  memberRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  AddMember(member: Member) {
    this.membersRef.push({
      firstName: member.firstName,
      email: member.email,
      membership:member.membership,
      mobileNumber: member.mobileNumber,
      address: member.address,
      createdOn:member.createdOn,
      expiryOn:member.expiryOn,
      isActive:member.isActive,
      isDependent:member.isDependent
    });
  }
  GetMember(id: string) {
    this.memberRef = this.db.object('members-list/' + id);
    return this.memberRef;
  }
  GetMembersList() {
    this.membersRef = this.db.list('members-list');
    return this.membersRef;
  }
  UpdateMember(member: Member) {
    this.memberRef.update({
      firstName: member.firstName,
      email: member.email,
      membership:member.membership,
      mobileNumber: member.mobileNumber,
      address: member.address,
      expiryOn:member.expiryOn,
      isActive:member.isActive,
      isDependent:member.isDependent
    });
  }
}