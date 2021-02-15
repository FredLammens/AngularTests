import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient) {}
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.apiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }
    signIn(email: string, password: string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.apiKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "An unknown error occured"
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'EMAIL_NOT_FOUND':
               errorMessage = 'this email does not exist.'
               break;
            case 'INVALID_PASSWORD':
                errorMessage = 'this password is not correct.';
                break;
            default:
                errorMessage 
        }
        return throwError(errorMessage);
    }
}

export interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; //optional for login
}