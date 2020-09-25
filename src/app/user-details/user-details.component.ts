import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [
  ]
})
export class UserDetailsComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') == null)
    {
      this._router.navigate([`/login`])
    }
  }

}
