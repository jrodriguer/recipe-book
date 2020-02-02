import { Component } from "@angular/core";

@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html"
})
export class AuthComponent {
    public isLoginMode = true; // alternate to login and rgister

    onSwitchMode(): void {
        this.isLoginMode = !this.isLoginMode;
    }
}
