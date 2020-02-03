import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        this.http.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyB0V4q7fRyp_Vs8MpykxGPoZGS3WmVdsVg]',
            {
                email: email,
                password: password,
            },
        );
    }
}
