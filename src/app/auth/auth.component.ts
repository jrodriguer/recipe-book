import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    public isLoginMode = true; // alternate to login and rgister
    public isLoading = false;
    public error: string = null;

    constructor(private authSrv: AuthService) {}

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const pw = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObs = this.authSrv.signIn(email, pw);
        } else {
            authObs = this.authSrv.signUp(email, pw);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
            },
            errMessg => {
                console.log(errMessg);
                this.error = errMessg;
                this.isLoading = false;
            },
        );

        form.reset();
    }
}
