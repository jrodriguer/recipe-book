import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    public isLoginMode = true; // alternate to login and rgister

    constructor(private authSrv: AuthService) {}

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm): void {
        const email = form.value.email;
        const pw = form.value.password;
        if (!form.valid) {
            // return;
        } else {
            this.authSrv.signUp(email, pw).subscribe(
                resData => {
                    console.log(resData);
                },
                error => {
                    console.log(error);
                },
            );
        }

        form.reset();
    }
}
