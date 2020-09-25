import { APIService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserDetail } from 'src/app/shared/user-detail.model';

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.component.html',
  styles: []
})
export class UserDetailListComponent implements OnInit {

  user: UserDetail

  constructor(public service: APIService, private toastr: ToastrService) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.user_type == "Manager")
    {
      this.service.refreshWorkerList(); 
    }
    else
    {
      this.service.refreshEmployeesList();
    }
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
  
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  OnDelete(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteUserDetail()
        .subscribe(res => {
          if(this.user.user_type == "Manager")
          {
            this.service.refreshWorkerList(); 
          }
          else
          {
            this.service.refreshEmployeesList();
          }
          this.toastr.warning('Executed Successfully', 'Delete User Record')
        },
        err => { console.log(err); })
    }
    this.resetForm();
  }
}