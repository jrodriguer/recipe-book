import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyB0V4q7fRyp_Vs8MpykxGPoZGS3WmVdsVg]',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            },
        );
    }
}
