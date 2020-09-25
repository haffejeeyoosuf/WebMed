import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { APIService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styles: [
  ]
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(private _router : Router, public service: APIService) { }

  ngOnInit(): void {
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
      user_email: null,
      user_password: '',
      user_phone: '',
      user_salary: 0,
      user_address: null,
      user_datecreated: new Date(),
      user_datedeactivated: null
    }
  }

  onSubmit(form: NgForm) {
    
    this.service.formData.user_password = this.GenerateCode(8);
    this.service.RecoverPassword();
  }

  GenerateCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}
