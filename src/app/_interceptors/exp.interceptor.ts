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
        // this.accountService.user$.pipe(take(1)).subscribe(user => currentUser = user)
        //     if(currentUser) {
        //         req.params.set('auth', currentUser.token);
        //     }
    
        return next.handle(req);
    }

}