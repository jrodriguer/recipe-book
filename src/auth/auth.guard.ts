import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authSrv: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot,
    ): boolean | Observable<boolean> | Promise<boolean> {
        return this.authSrv.user.pipe(
            map(user => {
                return !!user;
            }),
            tap(isAuth => {
                if (!isAuth) {
                    this.router.navigate(['auth']);
                }
            }),
        );
    }
}
