import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    public isLoginMode = true; // alternate to login and rgister
    public isLoading = false;
    public error: string = null;

    constructor(private authSrv: AuthService) {}

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm): void {
        const email = form.value.email;
        const pw = form.value.password;
        if (!form.valid) {
            return;
        } else {
            this.authSrv.signUp(email, pw).subscribe(
                resData => {
                    console.log(resData);
                    this.isLoading = true;
                },
                errMessg => {
                    console.log(errMessg);
                    this.error = errMessg;
                    this.isLoading = false;
                }
            );
        }

        form.reset();
    }
}
