import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenService } from '@app/services/token/token.service';
import { TokenDefinition } from './../interfaces/index';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = null;
    let token = null;

    this.tokenService.tokenData$
    .subscribe((res: TokenDefinition) => token = res?.accessToken);

    if (
      token
      && req.url.includes('api/user')
      || (req.url.includes('api/books') && req.method !== 'GET')
      || req.url.includes('api/favorites')
    ) {
      newReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(newReq || req)
      .pipe(tap(
        () => {},
        (err) => {
          if (err instanceof HttpErrorResponse) {
            console.log(err)
          }
        })
      );
  }
}
