import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudServiceMember } from 'src/app/shared/service/member-crud.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  memberForm: FormGroup;
  constructor(
    public crudApi: CrudServiceMember,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private router: Router,

  ) {
  }
  public now = new Date();
  ngOnInit() {
    this.Form();
    this.getMemberById();
  }

  getMemberById() {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.GetMember(id as string).valueChanges()
      .subscribe((data) => {
        this.memberForm.setValue(data);
      });
  }
  get firstName() {
    return this.memberForm.get('firstName');
  }
  get membership() {
    return this.memberForm.get('membership');
  }
  get address() {
    return this.memberForm.get('address');
  }
  get email() {
    return this.memberForm.get('email');
  }
  get mobileNumber() {
    return this.memberForm.get('mobileNumber');
  }
  get isActive() {
    return this.memberForm.get('isActive');
  }
  get isDependent() {
    return this.memberForm.get('isDependent') ?? false;
  }
  get expiryOn() {
    return this.memberForm.get('expiryOn');
  }
  Form() {
    this.memberForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      membership: ['yearly'],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expiryOn: [],
      isDependent: [false],
      isActive: [false],
      createdOn: [],
    });
  }
  ResetForm() {
    this.memberForm.reset();
  }

  submitMemberData() {
    debugger
    this.crudApi.UpdateMember(this.memberForm.value);
    this.toastr.success(
      this.memberForm.controls['firstName'].value + ' updated successfully!'
    );
    this.ResetForm();
    this.router.navigate(['members']);
  }

  memberShipChanged(ev: any) {
    const val = this.memberForm.getRawValue().membership;
    if (val === 'yearly') {
      let mdy = (this.now.getFullYear() + 1) + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate();
      this.memberForm.patchValue({ expiryOn: mdy });
    }
    if (val === 'onetime') {
      let mdy = (this.now.getFullYear()) + '-' + (this.now.getMonth() + 2) + '-' + this.now.getDate();
      if ((this.now.getMonth() + 1) == 12)
        mdy = (this.now.getFullYear() + 1) + '-0' + 1 + '-' + this.now.getDate();
      console.log(mdy)
      this.memberForm.patchValue({ expiryOn: mdy });
    }
    if (val === 'free') {
      let mdy = (this.now.getFullYear() + 2) + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate();
      this.memberForm.patchValue({ expiryOn: mdy });
    }
  }
}

