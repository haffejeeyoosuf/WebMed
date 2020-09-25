import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from '../shared/user-detail.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class menu implements OnInit{

UD: UserDetail

  constructor(private _router: Router){ }

  ngOnInit(): void {

    if(localStorage.getItem('currentUser') == null)
    {
      this._router.navigate([`/login`])
    }
    else
    {
      this.UD = JSON.parse(localStorage.getItem('currentUser'));
    }

    document.getElementById("username").textContent = ' ' + this.UD.user_fullname;
  }

  btnLogout()
  {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  }

  GoToPage(pageName: string): void {
    this._router.navigate([`${pageName}`]);
  }
}