import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, exhaustMap, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AuthResponseData } from '../../models/auth-model.temp';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  intercept(
    req: HttpRequest<string>,
    next: HttpHandler
  ): Observable<HttpEvent<AuthResponseData>> {
    /*
      Do not configure a continuous subscription.
      Manage the subscription, give me the last user and cancel
    */
    return this.authSrv.user$.pipe(
      take(1),
      // Channel the two observable --the user and the observable http
      switchMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + user.token)
        });
        return next.handle(modifiedReq);
      })
      // exhaustMap((user: string | null) => {
      //   if (!user) {
      //     return next.handle(req);
      //   }
      //   console.log(user);
      //   const modifiedReq = req.clone({
      //     params: new HttpParams().set('auth', user)
      //   });
      //   return next.handle(modifiedReq);
      // })
    );
  }
}
