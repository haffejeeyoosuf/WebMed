import { APIService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/shared/user-detail.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styles: [],
  providers: [DatePipe]
})

export class ProfileDetailComponent implements OnInit {
UD: UserDetail
  constructor(public service: APIService, private toastr: ToastrService, private _router: Router, private datePipe: DatePipe) { }

  ngOnInit() {

    if(localStorage.getItem('currentUser') == null)
    {
      this._router.navigate([`/login`])
    }
    else
    {
      this.UD = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    if(this.UD.user_type == "Manager")
    {
      document.getElementById("Profile_Name").setAttribute("disabled","disabled");
    }

    this.fillForm();
    console.log('UID ' +this.UD.user_id);
  }
  
  fillForm(form?: NgForm) {
    console.log('UID ' +this.UD.user_id);
    this.service.formData = {
      user_id: this.UD.user_id,
      user_status: this.UD.user_status,
      user_type: this.UD.user_type,
      user_fullname: this.UD.user_fullname,
      user_idnum: this.UD.user_idnum,
      user_email: this.UD.user_email,
      user_password: this.UD.user_password,
      user_phone: this.UD.user_phone,
      user_salary: this.UD.user_salary,
      user_address: this.UD.user_address,
      user_datecreated: this.UD.user_datecreated,
      user_datedeactivated: this.UD.user_datedeactivated
    }
    var d = new Date(this.service.formData.user_datecreated)
    this.datePipe.transform(d, 'yyyy/MM/dd');
    document.getElementById('RegDate').textContent = 'Registration Date: ' + this.datePipe.transform(d, 'yyyy/MM/dd');
    
  }

  onSubmit(form: NgForm) {

    var txtCP = <HTMLInputElement> document.getElementById("ConfirmPW")

    if(txtCP.value == this.service.formData.user_password)
    {
      this.updateRecord(form);
      this._router.navigate([`admin`]);
    }
    else
    {
      this.toastr.error("Passwords Dont't Match", "Try Again !");
    }
  }
  
  updateRecord(form: NgForm) {
    this.service.putUserDetail().subscribe(
      res => {
        localStorage.setItem('currentUser', JSON.stringify(this.service.formData));
        this.toastr.info('Executed successfully!', 'Update Profile');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}