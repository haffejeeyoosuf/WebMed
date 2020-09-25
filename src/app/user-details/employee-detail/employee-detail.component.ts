import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/shared/user-detail.model';
import { APIService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styles: []
})

//@ViewChild("placesRef")
//{
  //placesRef : GooglePlaceDirective;
//} 

export class EmployeeDetailComponent implements OnInit {

  user: UserDetail

  constructor(public service: APIService, private toastr: ToastrService, private _router: Router) { }

  ngOnInit() {
    this.resetForm();

    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.user_type == "Manager")
    {
      document.getElementById("HideManager").hidden = true
      this.service.formData.user_type = "Worker"
    }
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
      user_salary: null,
      user_address: '',
      user_datecreated: new Date(),
      user_datedeactivated: null
    }
  }
  
  insertRecord(form: NgForm) {
    this.service.AddUserToFarm().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted Successfully!', 'Create Employee')
        if(this.user.user_type == "Manager")
        {
          this.service.refreshWorkerList(); 
        }
        else
        {
          this.service.refreshEmployeesList();
        }
      },
      err => { console.log(err); }
    )
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.user_id == 0)
    {
      if(this.service.formData.user_type == "")
      {
        this.toastr.error("Select User Type And Try Again!")
      }
      else
      {
        this.insertRecord(form);
      }   
    }
    else
    {
      this.updateRecord(form);
    }
  }
  
  updateRecord(form: NgForm) {
    this.service.putUserDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Executed successfully!', 'Update Employee');
        if(this.user.user_type == "Manager")
        {
          this.service.refreshWorkerList(); 
        }
        else
        {
          this.service.refreshEmployeesList();
        }
      },
      err => {
        console.log(err);
      }
    )
  }
    
  //public handleAddressChange(address: Address) {
  // Do some stuff
//}

}