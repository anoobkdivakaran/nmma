import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Member } from 'src/app/shared/interface/member';
import { CrudServiceExpence } from 'src/app/shared/service/expence-crud.service';
import { CrudServiceMember } from 'src/app/shared/service/member-crud.service';

@Component({
  selector: 'app-edit-expence',
  templateUrl: './edit-expence.component.html',
  styleUrls: ['./edit-expence.component.css']
})
export class EditExpenceComponent implements OnInit {
  public expenceForm: FormGroup;
  router: any;
  constructor(
    public crudApiExpence: CrudServiceExpence,
    public crudApiMember: CrudServiceMember,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
  ) {
  }

  public now = new Date();
  memberList: any;
  adminUser: any;
  ngOnInit() {
    this.adminUser = this.authService;
    this.getExpeceById();
    this.Form();
    this.getMemberList();
  }

  getExpeceById() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApiExpence.GetExpence(id as string).valueChanges()
      .subscribe((data) => {
        this.expenceForm.setValue(data);
      });
  }
  getMemberList() {
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
      amount: ['', [Validators.required, Validators.pattern('/^(?![0,.]+$)(?:0|[1-9]\d{0,2}(?:,\d{3})*|[1-9]\d*)(?:\.\d{1,2})?$/'), Validators.min(1)]],
      notes: ['', [Validators.required]],
      createdOn: [],
      createdBy: [],
      updatedOn: [(this.now).toISOString()],
      updatedBy: [],
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
    this.crudApiExpence.UpdateExpence(this.expenceForm.value);
    this.toastr.success(
      this.expenceForm.controls['expenceType'].value + ' updated successfully!'
    );
    this.ResetForm();
    this.router.navigate(['members']);
  }

}
