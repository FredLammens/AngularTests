import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";


@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null); // difference between normal subject = also gives subscribers acces to previous data

    constructor(private http: HttpClient, private router: Router) {}

    logout(){
        this.user.next(null);
        //can be used in multiple components 
        this.router.navigate(['/auth']);
    }

    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.apiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
           this.handleAuthentification(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }
    signIn(email: string, password: string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.apiKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentification(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
         }));
    }
    autoLogin(){
        const userData: {
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

        if(loadedUser.token){ //only if valid 
            this.user.next(loadedUser);
        }
    }

    private handleAuthentification(email:string,userId:string,token:string,expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // seconds to milliseconds
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user)); //TODO:encrypt
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