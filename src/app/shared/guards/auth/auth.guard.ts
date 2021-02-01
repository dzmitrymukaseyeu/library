import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService, ApiService } from '@app/services';
import { UserDefinition, ResUserDataDefinition } from '@app/shared/interfaces';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


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
          if (!data) {
            return this.apiService.getUserData().pipe(
              switchMap((res: ResUserDataDefinition) => of(!!res?.content?.firstName)),
              catchError(()=> of(false))
            );
          }

          return of(true);
        }),
        switchMap((data: boolean) => {
          if (data) {
            return of(true);
          }

          this.router.navigate(['/auth/sign-in']);

          return of(false);
        })
      )
  };
}
