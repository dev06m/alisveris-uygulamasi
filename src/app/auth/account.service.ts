import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, ReplaySubject, throwError } from "rxjs";
import { catchError, tap, timeInterval } from "rxjs/operators";
import { AuthComponent } from "./auth.component";
import { User } from "./user.model";

interface ResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AccountService{

    constructor(private http: HttpClient, private router: Router) {}

    private userSource = new BehaviorSubject<User>(null);
    user$ = this.userSource.asObservable();

    signUp(model) {
        return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9-aUXEEcA2hi9nAdy8xZNZJQlG9Jkt5k', model)
            .pipe(catchError(error => {
                let errorMessage = 'An unknown error is occured!';
                    if (!error.error || !error.error.error) {
                        throwError(errorMessage);
                    }
                switch (error.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'The email address is already in use by another account!'
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errorMessage = 'Password sign-in is disabled for this project!'
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = ' We have blocked all requests from this device due to unusual activity. Try again later!'
                        break;
                    default:
                    break;
                }
                return throwError(errorMessage);
            }), tap( resData => {
                this.handleAuthentication(resData)
            }));
    }
    
    logIn(model) {
        return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9-aUXEEcA2hi9nAdy8xZNZJQlG9Jkt5k', model)
            .pipe( 
                tap(resData => {
                    console.log(resData);
                    this.handleAuthentication(resData);
                }),
                catchError(error => {
                    let errorMessage = 'An unknown error is occured!';
                    if (!error.error || !error.error.error) {
                        throwError(errorMessage);
                    }
                    switch (error.error.error.message) {
                        case 'EMAIL_NOT_FOUND':
                            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted!'
                            break;
                        case 'INVALID_PASSWORD':
                            errorMessage = 'The password is invalid or the user does not have a password!'
                            break;
                        case 'USER_DISABLED':
                            errorMessage = 'The user account has been disabled by an administrator!'
                            break;
                        default:
                        break;
                    }
                    return throwError(errorMessage);
            }));
    }   

    logOut() {
        localStorage.removeItem('user');
        this.userSource.next(null);
        this.router.navigateByUrl('')
    }

    handleAuthentication(resData: ResponseData) {

        const expirationDate = new Date(new Date().getTime() + 10000)// +resData.expiresIn * 1000); // set expiration time
        console.log(expirationDate)
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

        setInterval(_ => {
            // this.autoLogin(user);
        }, 1000) 
        
        this.userSource.next(user);
        localStorage.setItem('user', JSON.stringify(user)); // bu next'den once gelmeli
        this.router.navigateByUrl('/recipes')
        
    }

    autoLogOut(): void {
        this.logOut();
    }

}