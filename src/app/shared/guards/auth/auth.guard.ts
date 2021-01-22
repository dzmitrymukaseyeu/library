import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { get } from 'http';
import { from, Observable, of, forkJoin } from 'rxjs';
import { skip } from 'rxjs/operators';
import { switchMap, catchError } from 'rxjs/operators';
import { UserService, ApiService } from './../../../services/index';
import { UserDefinition } from './../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userData: UserDefinition = null;

  constructor(
    public userService: UserService,
    public apiService: ApiService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return this.userService.userData$
      .pipe(
        switchMap(data => {
          if(!data) {
            return this.apiService.getUserData().pipe(catchError(()=> of(false)));
          }

          return of(true);
        }),
        switchMap(data => {
          console.log(data);
          // @ts-ignore
          if(data === true || data?.content?.firstName) {
            return of(true);
          }

          this.router.navigate(['/auth/sign-in']);

          return of(false);
        })
      )
  };
}
