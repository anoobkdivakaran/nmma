import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/shared/interface/member';
import { CrudServiceMember } from 'src/app/shared/service/member-crud.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  page: number = 1;
  pagerowcount: number = 10;
  Member: Member[]
  preLoader: boolean;
  noData: boolean;
  constructor(public crudApi: CrudServiceMember) {

  }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetMembersList();
    s.snapshotChanges().subscribe(data => {
      this.Member = [];
      data.forEach(item => {
        let a = item.payload.toJSON() as any;
        a['$key'] = item.key;
        a["membership"] = a["membership"] == 'free' ? 'Free' : a["membership"] == 'onetime' ? 'One Time' : a["membership"] == 'yearly' ? 'Yearly' : null
        this.Member.push(a as Member);
      })
    })
  }

  dataState() {
    this.crudApi.GetMembersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    })
  }

}
