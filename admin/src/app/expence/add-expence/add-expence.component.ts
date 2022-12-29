import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Member } from 'src/app/shared/interface/member';
import { CrudServiceExpence } from 'src/app/shared/service/expence-crud.service';
import { CrudServiceMember } from 'src/app/shared/service/member-crud.service';
@Component({
  selector: 'app-add-expence',
  templateUrl: './add-expence.component.html',
  styleUrls: ['./add-expence.component.css']
})
export class AddExpenceComponent implements OnInit {
  public expenceForm: FormGroup;
  constructor(
    public crudApiExpence: CrudServiceExpence,
    public crudApiMember: CrudServiceMember,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public authService: AuthService
  ) {
  }

  public now = new Date();
  memberList: any;
  adminUser: any;
  ngOnInit() {
    this.crudApiExpence.GetExpenceList();
    this.Form();
    this.GetMemberList();
  }
  GetMemberList() {
    let s = this.crudApiMember.GetMembersList();
    s.snapshotChanges().subscribe(data => {
      this.memberList = [];
      data.forEach(item => {
        let a = item.payload.toJSON() as any;
        a['$key'] = item.key;
        this.memberList.push(a as Member);
      })
    })
  }

  Form() {
    this.expenceForm = this.fb.group({
      expenceType: ['', [Validators.required]],
      memberKey: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)]],
      notes: ['', [Validators.required]],
      createdOn: [(this.now).toISOString()],
      createdBy: [''],
      updatedOn: [''],
      updatedBy: [''],
      isActive: true
    });
  }
  get expenceType() {
    return this.expenceForm.get('expenceType');
  }
  get memberKey() {
    return this.expenceForm.get('memberKey');
  }
  get amount() {
    return this.expenceForm.get('amount');
  }
  get notes() {
    return this.expenceForm.get('notes');
  }

  ResetForm() {
    this.expenceForm.reset();
  }

  submitExpenceData() {
    debugger
    this.crudApiExpence.AddExpence(this.expenceForm.value);
    this.toastr.success(
      this.expenceForm.controls['expenceType'].value + ' successfully added!'
    );
    this.ResetForm();
  }

}