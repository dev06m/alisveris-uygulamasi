import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { exhaustMap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.accountService.user$.pipe(
      take(1),
      map(authState => {
        return authState;
      }),
      exhaustMap(user => {
        
        // console.log(user)
        let token;
        let userToken = (JSON.parse(localStorage.getItem('user')))?._token;
        let tokenExpirationTime = (JSON.parse(localStorage.getItem('user')))?._tokenExpirationDate; 
        
        if(new Date() > new Date(tokenExpirationTime)) {
          this.accountService.autoLogOut();
          return next.handle(request);
        } 
        
        if(!user && userToken === null) {
          return next.handle(request);
        } else {
          user === null ? token = userToken : token = user.token;
        }
        // request.
        request = request.clone({
          params: new HttpParams().set('auth', token)
        })
        return next.handle(request);
      })
    );
    console.log('subs yok ')
    return next.handle(request);
  }
}
   