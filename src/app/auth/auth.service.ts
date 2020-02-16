import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string): Observable<AuthResponseData> {
        return (
            this.http
                .post<AuthResponseData>(
                    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0V4q7fRyp_Vs8MpykxGPoZGS3WmVdsVg",
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                )
                // Error message conversion logic
                //
                .pipe(
                    catchError(errRes => {
                        let errorMessg = "An unknown error ocurred";
                        if (!errRes.error || !errRes.error.error) {
                            return throwError(errorMessg);
                        }
                        switch (errRes.error.error.message) {
                            case "EMAIL_EXISTS":
                                errorMessg = "This exists already";
                        }
                        return throwError(errorMessg);
                    })
                )
        );
    }
}
