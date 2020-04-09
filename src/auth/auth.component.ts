import {
    Component,
    ComponentFactoryResolver,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponseData } from 'src/models/auth-model.temp';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
    public isLoginMode = true; // alternate to login and register
    public isLoading = false;
    public error: string = null;

    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authSrv: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    onSwitchMode() {
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
                this.router.navigate(['/recipes']);
            },
            errMessg => {
                this.error = errMessg;
                this.isLoading = false;
                this.showErrorAlert(this.error);
            },
        );
        form.reset();
    }

    onError() {
        this.error = null;
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        const alertFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent,
        );

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertFactory);

        componentRef.instance.msg = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
