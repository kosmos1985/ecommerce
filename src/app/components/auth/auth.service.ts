import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>({
    email: '',
    id: '',
    _tocken: '',
    _tockenExpirationDate: new Date(),
    tocken: '',
  });
  private tockenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  singUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEDATfiUC01FmMg-lSI7_LzUn8ImqTC4o',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrorResponse),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData || userData === null) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._tocken,
      new Date(userData._tockenExpirationDate)
    );

    if (loadedUser.tocken) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tockenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEDATfiUC01FmMg-lSI7_LzUn8ImqTC4o',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrorResponse),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next({
      email: '',
      id: '',
      _tocken: '',
      _tockenExpirationDate: new Date(),
      tocken: '',
    });
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tockenExpirationTimer) {
      clearTimeout(this.tockenExpirationTimer);
    }
    this.tockenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tockenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    tocken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, tocken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleErrorResponse(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid!';
        break;
    }
    return throwError(errorMessage);
  }
}
