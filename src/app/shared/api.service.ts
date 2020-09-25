import { UserDetail } from './user-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Constants } from '../helper/constants';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  formData: UserDetail;
  loginData : UserDetail;
  list : UserDetail[];
  list2 : UserDetail;
  UD: UserDetail;
  public static WorkerList: UserDetail[];
  
  constructor(private http: HttpClient, private toastr: ToastrService, private _router: Router) { }

  postUserDetail() {
    this.formData.user_datecreated = new Date()
    return this.http.post(Constants.rootURL + '/Users', this.formData);
  }

  putUserDetail() {
    console.log('put user: ' + this.formData.user_id);
    return this.http.put(Constants.rootURL + '/Users/'+ this.formData.user_id, this.formData);
  }
  
  deleteUserDetail() {
    this.formData.user_status = false;
    this.formData.user_datedeactivated = new Date()
    return this.http.put(Constants.rootURL + '/Users/'+ this.formData.user_id, this.formData);
  }

  getUser(){
    this.http.post(Constants.rootURL + '/Users/Login',this.loginData)
    .subscribe( (data: any) => {this.list2}
    )
  }

  getUserFromID(){
    this.list2 = JSON.parse(localStorage.getItem('currentUser'));
    console.log('UID: ' + this.list2.user_id)
    this.http.get(Constants.rootURL + '/Users/' + localStorage.getItem('currentUser'))
    .subscribe( (data: any) => {this.list2}
    )
  }

  RecoverPassword(){
    this.http.post(Constants.rootURL + '/Users/RecoverPassword',this.formData)
    .subscribe(
      res => {
        this.toastr.info("Sent Successfully!", "Reset Email")
        console.log(res);
        this._router.navigate([`/login`])
      },
      err => {
        this.toastr.error("Enter A Valid Email !", "Failed To Send Email")
        console.log(err);
      }
    )
  }

  getUserFarm(uid){
    this.http.get(Constants.rootURL + '/Farms/ReturnFarms/' + uid)
    .toPromise()
    .then(res => localStorage.setItem('MangersFarms',JSON.stringify(res)))
    window.location.reload()
  }

  postLoginDetail() {

    return this.http.post(Constants.rootURL + '/Users/Login', this.formData)
    .toPromise()
    .then(
      res =>{

        this.UD = JSON.parse(JSON.stringify(res));
        localStorage.setItem('currentUser', JSON.stringify(res));
        sessionStorage.setItem('currentUser', JSON.stringify(res));
        this.toastr.info('Completed Successfully!', 'Login');
        this._router.navigate([`/admin`]);
      },
      err => {
        this.toastr.info('Failed!', 'Login');
        console.log(err);
    } )
  }

  GetTotalEmployees()
  {
    this.http.get(Constants.rootURL + '/Users/NumUsers/' + localStorage.getItem('FarmID'))
    .toPromise()
    .then(res => document.getElementById('TotalEmployees').textContent = res.toString()); //localStorage.setItem('TotalEmployees',res.toString()));
  }

  GetTotalWorkers()
  {
    this.http.get(Constants.rootURL + '/Users/NumWorkers/' + localStorage.getItem('FarmID'))
    .toPromise()
    .then(res => document.getElementById('TotalWorkers').textContent = res.toString()); //localStorage.setItem('TotalUsers',res.toString()));
  }

  refreshList(){
    this.http.get(Constants.rootURL + '/Users')
    .toPromise()
    .then(res => this.list = res as UserDetail[]);
  }

  refreshEmployeesList(){
    this.http.get(Constants.rootURL + '/Users/ReturnEmployeesPerFarm/' + localStorage.getItem('FarmID'))
    .toPromise()
    .then(res => this.list = res as UserDetail[]);
  }

  refreshWorkerList(){
    this.http.get(Constants.rootURL + '/Users/ReturnWorkersPerFarm/' + localStorage.getItem('FarmID'))
    .toPromise()
    .then(res => this.list = res as UserDetail[]);
  }

  AddUserToFarm() {
    return this.http.post(Constants.rootURL + '/Users/AddEmployeeToFarm/' + localStorage.getItem('FarmID'), this.formData);
  }

  ListWorkers(){
    this.http.get(Constants.rootURL + '/Users/ReturnWorkersPerFarm/' + localStorage.getItem('FarmID'))
    .toPromise()
    .then(res => {
      APIService.WorkerList = res as UserDetail[]

      for(let i = 0; i < APIService.WorkerList.length; i++)
      {
        var x = (<HTMLSelectElement> document.getElementById("SelectWorker"));
        var option = document.createElement("option");
        option.text = APIService.WorkerList[i].user_fullname;
        option.value = APIService.WorkerList[i].user_id.toString();
        option.id = APIService.WorkerList[i].user_fullname;
        x.add(option);
      }
  
      x.selectedIndex = 0;
    });//localStorage.setItem('WorkerList',JSON.stringify(res)));
  }
}

