import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from '../../models/auth-model.temp';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  public isLoginMode = true;
  public isLoading = false;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective =
    {} as PlaceholderDirective;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.closeSub = Subscription.EMPTY;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

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
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errMessg) => {
        this.isLoading = false;
        this.showErrorAlert(errMessg);
      }
    );
    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

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
