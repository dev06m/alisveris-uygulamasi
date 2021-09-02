import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/auth/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userToken: string;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.userToken = (JSON.parse(localStorage.getItem('user')))?._token;
    console.log(this.userToken)
  }

  a() {
    console.log('i will beat them all and build my own business and run it through my career')
  }

  logOut() {
    this.accountService.logOut();
  }

}
