import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { AuthResponseData } from 'src/models/auth-model.temp';

@Injectable({ providedIn: 'root' })
export class AuthService {
    public user = new BehaviorSubject<User>(null); // store and info user state

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0V4q7fRyp_Vs8MpykxGPoZGS3WmVdsVg',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                },
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.expiresIn,
                        resData.idToken,
                        +resData.expiresIn, // treated as number
                    );
                }),
            );
    }

    signIn(email: string, pw: string): Observable<AuthResponseData> {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0V4q7fRyp_Vs8MpykxGPoZGS3WmVdsVg',
                {
                    email: email,
                    password: pw,
                    returnSecureToken: true,
                },
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.expiresIn,
                        resData.idToken,
                        +resData.expiresIn,
                    );
                }),
            );
    }

    autoLogin() {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            return;
        } else {
        }
    }

    logout() {
        this.user.next(null);
    }

    /*
        Create new user and log in
    */
    private handleAuth(
        email: string,
        userId: string,
        token: string,
        expiresIn: number,
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000,
        );
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errRes: HttpErrorResponse): Observable<never> {
        let errorMessg = 'An unknown error ocurred';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessg);
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessg = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessg = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessg = 'This password is not correct';
                break;
        }
        return throwError(errorMessg);
    }
}