import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/member-crud.service';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})


export class AddMemberComponent implements OnInit {
  public memberForm: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    
  ) {
  }
  public now = new Date();
  ngOnInit() {
    this.crudApi.GetMembersList();
    this.Form();
    this.memberShipChanged('yearly');
  }
  Form() {
    this.memberForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['',[Validators.required, Validators.minLength(5)]],
      membership:['yearly'],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      createdOn: [(this.now).toISOString()],
      expiryOn:  [(this.now).toISOString().substring(0,10)],
      isDependent:true,
      isActive:true
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

  ResetForm() {
    this.memberForm.reset();
  }

  submitMemberData() {
    debugger
    this.crudApi.AddMember(this.memberForm.value);
    this.toastr.success(
      this.memberForm.controls['firstName'].value + ' successfully added!'
    );
    this.ResetForm();
  }

  memberShipChanged(ev: any) {
    const val = this.memberForm.getRawValue().membership;
    if (val === 'yearly') {
      let mdy =  (this.now.getFullYear()+1) + '-' + (this.now.getMonth()+1) +'-'+ this.now.getDate(); 
      this.memberForm.patchValue({expiryOn: mdy});
    }
    if (val === 'onetime') { 
      let mdy =  (this.now.getFullYear()) + '-' + (this.now.getMonth()+2) +'-'+ this.now.getDate(); 
      if((this.now.getMonth()+1)==12)
      mdy =  (this.now.getFullYear()+1) + '-0' + 1 +'-'+ this.now.getDate(); 
      console.log(mdy)
      this.memberForm.patchValue({expiryOn: mdy});
    }
    if (val === 'free') {
      let mdy =  (this.now.getFullYear()+2) + '-' + (this.now.getMonth()+1) +'-'+ this.now.getDate(); 
      this.memberForm.patchValue({expiryOn: mdy});
    }
  }
  }
  
