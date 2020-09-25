import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from '../shared/user-detail.model';
import { APIService } from '../shared/api.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styles: [
  ]
})
export class AdminPortalComponent implements OnInit {

  title = 'dashboard';
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;
  data1 = [];

  user: UserDetail

  constructor(private APIService: APIService, private _router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem('currentUser') == null)
    {
      this._router.navigate([`/login`]);
    }
    else
    {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }

  }

  GoToPage(pageName: string): void {
    this._router.navigate([`${pageName}`]);
  }
}