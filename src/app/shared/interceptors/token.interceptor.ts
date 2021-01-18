import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor () {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = null;

    if (req.url.includes('api/user')) {
      newReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      });
    }

    return next.handle(newReq || req);
  }
}
