import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "./account.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private accountService: AccountService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // this.accountService.user$.subscribe(user => console.log(user))
        const token = (JSON.parse(localStorage.getItem('user')))?._token;
        if (token !== undefined) {
            return true;
        }
        alert('You are not authorised!');
        return this.router.createUrlTree(['/auth']); // ?????
        
    }

}