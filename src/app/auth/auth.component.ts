import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    public isLoginMode = true; // alternate to login and rgister

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm): void {
        console.log(form);
        form.reset();
    }
}
