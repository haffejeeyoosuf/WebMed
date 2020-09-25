import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APIService } from './../app/shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Angular-Farm-CRUD';
  showMenu: boolean;

  constructor(private _router: Router, private toastr: ToastrService){
    _router.events.forEach((event) => {
      if(event instanceof NavigationStart) {

        if(localStorage.getItem('currentUser') == null || event.url == "/login" || event.url == "/register" || event.url == "/recoverpassword" || event.url == "/resetpassword" || event.url == "/selectfarm" || event.url == "/farm")
        {
          this.showMenu = false;
        }
        else
        {
          this.showMenu = true;
        }
      }
    });

  }

  ngOnInit(): void {

    console.log('USER' + localStorage.getItem('currentUser'));
  }
  
  btnLoginClick(pageName: string): void {

    console.log('USER B4: ' + localStorage.getItem('currentUser'));

    if((document.getElementById('l').innerText == "Logout") && (localStorage.getItem('currentUser')!= null))
    {  
      localStorage.removeItem('currentUser');
      localStorage.removeItem('Employees');
      localStorage.removeItem('TotalFarms');
      localStorage.removeItem('NumFarms');
      localStorage.removeItem('TotalFields');
      localStorage.removeItem('TotalCrops');
      localStorage.removeItem('TotalIncome');
      localStorage.removeItem('TotalExpense');

      document.getElementById('l').innerText == "Login";
      document.getElementById('r').innerText == "Register";
      this._router.navigate([`login`]);
      this.toastr.info('Completed Successfully!','Logout');
      window.location.reload();
    }
    else
    {
      this._router.navigate([`${pageName}`]);
      this.toastr.info('Please Enter Your Credentials!','Login');
    }
    console.log('USER AFTER: ' + localStorage.getItem('currentUser'));
  }

  btnRegister(pageName: string): void
  {
    if((document.getElementById('r').innerText == "Register") && (localStorage.getItem('currentUser')== null))
    { 
      this._router.navigate([`${pageName}`]);
      this.toastr.info('Enter your particulars','Create Account');
      //window.location.reload();
    }
    else
    {
      this._router.navigate([`profile`]);
    }
  }
}