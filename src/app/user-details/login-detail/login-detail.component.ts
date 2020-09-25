import { APIService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-detail',
  templateUrl: './login-detail.component.html',
  styles: []
})

export class LoginDetailComponent implements OnInit {

  constructor(public service: APIService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser') != null)
    {
      this._router.navigate([`/admin`])
    }
    this.resetForm();
  }
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      user_id: 0,
      user_status: true,
      user_type: '',
      user_fullname: '',
      user_idnum: '',
      user_email: '',
      user_password: '',
      user_phone: '',
      user_salary: 0.0,
      user_address: '',
      user_datecreated: new Date(),
      user_datedeactivated: null
    }
  }
  
  onSubmit(form: NgForm) {
    this.service.postLoginDetail();
  }

}