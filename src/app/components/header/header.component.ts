import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/auth/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userToken: string;

  constructor(public accountService: AccountService, 
              public translate: TranslateService) {
                // translate.addLangs(['en', 'tr']);
                // translate.setDefaultLang('en');
              }

  ngOnInit(): void {
    this.userToken = (JSON.parse(localStorage.getItem('user')))?._token;
  }

  logOut() {
    this.accountService.logOut();
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
