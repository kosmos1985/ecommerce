import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string){
  return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEDATfiUC01FmMg-lSI7_LzUn8ImqTC4o',
    {
      email: email,
      password: password,
      returnSecureToken	: true
    }
   ).pipe(catchError(this.handleErrorResponse));
  };

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEDATfiUC01FmMg-lSI7_LzUn8ImqTC4o',
    {
        email: email,
        password: password,
        returnSecureToken	: true
    }
   ).pipe(catchError(this.handleErrorResponse));
  };
  
  private handleErrorResponse(errorRes : HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
     if(!errorRes.error || !errorRes.error.error){
       return throwError(errorMessage);
     }
     switch(errorRes.error.error.message){
       case 'EMAIL_EXISTS':
        errorMessage = 'This email exist already!';
        break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage ='Password is invalid!';
          break;
      }
      return throwError(errorMessage);
  };
}
