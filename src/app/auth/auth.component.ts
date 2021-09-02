import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogIn: boolean = true;
  model: any;
  isLoading: boolean = false;
  @ViewChild('form') form;
  error: string;

  constructor(private http: HttpClient, private route: Router, private accountService: AccountService, private formBuilder: FormBuilder) {
   }
   
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.isLogIn = true;
    this.model = {
      email: '',
      password: '',
      returnSecureToken: true // bu nu Secure yerine Security yaptigim icin bir gun hatayi bulmakla ugrastim!!!!!!!!
    }
  }

  switchLogIn() {
    this.isLogIn = true;
  }

  switchSignUp() {
    this.isLogIn = false;
  }

  signUp() {
  }
  
  onSubmit() {
    let authObs: Observable<any>;

    if(this.form.invalid)
      return;
    
    if (this.isLogIn) {
      // log in
      authObs = this.accountService.logIn(this.model);
    } else {
      // sign up
      authObs = this.accountService.signUp(this.model)
    }
    this.isLoading = true;
    authObs.subscribe(res => {
    }, errorMessage => {
      this.error = errorMessage;
    });
    this.isLoading = false;

  }

}
