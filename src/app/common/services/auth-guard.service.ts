 
import { Injectable }       from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
 
@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanLoad {
  
  constructor(private router: Router) {
  }
 
  canLoad(route: Route): boolean {
    let url: string = route.path;
    if (url==='pipes') {
      return true;
    }
    let token = JSON.parse(localStorage.getItem('user'))?._token;
    if (!token)  {
      alert('You are not authorised to this route.');
      this.router.navigateByUrl('auth');// createUrlTree(['/auth']); // ?????
      return false;
    }
    return true; 
  }
} 
 