import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogIn: boolean;
  model: any;
  isLoading: boolean = false;
  // @ViewChild('form') form;
  @ViewChild('container') container: ElementRef;
  error: string;
  closeError = true;
  failedLogin = false;
  authObs = new Observable<any>();
  selectedLang: string;private

  constructor(private accountService: AccountService, 
              private renderer: Renderer2,
              public translate: TranslateService,
              private router: Router) {
                this.selectedLang = translate.getDefaultLang();
                translate.onLangChange.subscribe(lang => this.selectedLang = lang.lang);
                
              }


  ngOnInit(): void {
    console.log(this.model)
    this.isLogIn = true;
    this.model = {
      email: '',
      password: '',
      returnSecureToken: true // bu nu Secure yerine Security yaptigim icin bir gun hatayi bulmakla ugrastim!!!!!!!!
    }
    console.log(this.model)
  }
     
  ngOnDestroy(): void {
    console.log(this.model)
  }

  switchLogIn() {
    this.isLogIn = true;
  }

  switchSignUp() {
    this.isLogIn = false;
  }

  onSubmit(checkLogin: boolean, form: NgForm) {
    this.isLogIn = checkLogin;
    
    if (this.isLogIn) {
      // log in
      // if(form.invalid){
      //   this.failedLogin = true;
      //   return;
      // }
      this.authObs = this.accountService.logIn(this.model);
    } else {
      // sign up
      if(form.invalid)
        return;
      this.authObs = this.accountService.signUp(this.model)
    }
    this.isLoading = true;
    
    this.authObs.subscribe(() => {},
    errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    }
    ); 
  }
  
  signUp() {
    // this.isLoading = false;
    this.renderer.addClass(this.container.nativeElement, "right-panel-active");
  }

  signIn() {
    // this.isLoading = true;
    this.renderer.removeClass(this.container.nativeElement, "right-panel-active");
  }

  closeErrorWindow(bool: boolean) {
    this.closeError = bool;
    this.error = undefined;
  }

  fillSignin(event) {
    // console.log(event)
    // event.preventDefault();
    this.model.email = 'guest@guest.com';
    this.model.password = 'password'
    console.log(this.model)
  }

}
