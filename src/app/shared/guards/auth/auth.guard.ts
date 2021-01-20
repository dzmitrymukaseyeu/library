import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { UserService } from './../../../services/index';
import { UserDefinition } from './../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userData: UserDefinition = null;

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // this.userService.userData$
    // .subscribe((res: UserDefinition) => this.userData = res);


    if (this.userService.userData$) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }

}
