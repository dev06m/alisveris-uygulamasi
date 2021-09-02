import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { AccountService } from "../auth/account.service";
import { User } from "../auth/user.model";

@Injectable()
export class ExpInterceptorService implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let currentUser: User;
        // console.log(req)
        // this.accountService.user$.pipe(take(1)).subscribe(user => currentUser = user)
        // console.log(currentUser)
        //     if(currentUser) {
        //         req.params.set('auth', currentUser.token);
        //     }
        //     console.log(req)
    
        return next.handle(req);
    }

}