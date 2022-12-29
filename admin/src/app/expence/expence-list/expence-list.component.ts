import { Component, OnInit } from '@angular/core';
import { Expence } from 'src/app/shared/interface/expence';
import { CrudServiceExpence } from 'src/app/shared/service/expence-crud.service';
import { CrudServiceMember } from 'src/app/shared/service/member-crud.service';

@Component({
  selector: 'app-expence-list',
  templateUrl: './expence-list.component.html',
  styleUrls: ['./expence-list.component.css']
})
export class ExpenceListComponent implements OnInit {
  page: number = 1;
  pagerowcount: number = 10;
  expence: Expence[];
  preLoader: boolean;
  noData: boolean;
  memberForm: any;
  constructor(public crudApiExpense: CrudServiceExpence,
    public crudApiMember: CrudServiceMember,
    ) {
  }


  ngOnInit() {
    this.dataState();
    let s = this.crudApiExpense.GetExpenceList();
    s.snapshotChanges().subscribe(data => {
      this.expence = [];
      data.forEach(item => {
        let a = item.payload.toJSON() as any;
        a['$key'] = item.key;
        a.member = this.getMemberById(a['memberKey'] as string)
        this.expence.push(a as Expence);
      })
      debugger
    })
  }

  dataState() {
    this.crudApiExpense.GetExpenceList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    })
  }
  getMemberById(id:string) {
    this.crudApiMember.GetMember(id).valueChanges()
      .subscribe((data) => {
       return(data);
      });
  }
}

