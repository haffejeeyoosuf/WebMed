import { APIService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})

export class UserDetailComponent implements OnInit {

  constructor(public service: APIService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
    this.resetForm();
  }
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      user_id: 0,
      user_status: true,
      user_type: 'Owner',
      user_fullname: '',
      user_idnum: null,
      user_email: '',
      user_password: '',
      user_phone: '',
      user_salary: 0,
      user_address: null,
      user_datecreated: new Date(),
      user_datedeactivated: null
    }
  }
  
  insertRecord(form: NgForm) {
    this.service.postUserDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted Successfully!', 'Create User')
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

  onSubmit(form: NgForm) {

    var txtCP = <HTMLInputElement> document.getElementById("ConfirmPW2")

    if(txtCP.value == this.service.formData.user_password)
    {   
      this.insertRecord(form);
      this._router.navigate([`/login`]);
    }
    else
    {
      this.toastr.error("Passwords Dont't Match", "Try Again !");
    }
  }

}