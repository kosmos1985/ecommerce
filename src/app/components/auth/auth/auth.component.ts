import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form_fields = {
    emailFormControl: this.fb.control('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  };

  matcher = new MyErrorStateMatcher();

  switchLoginMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = this.form_fields.emailFormControl.value;
    const password = this.form_fields.passwordFormControl.value;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.singUp(email, password);
    }

    authObservable.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/collections']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this, (this.isLoading = false);
      }
    );

    form.reset();
  }
}
