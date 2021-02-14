import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({providedIn: 'root'})
export class AuthService implements OnInit {
    constructor(private http: HttpClient) {}
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + environment.apiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
    ngOnInit(){
        
    }
}

interface AuthResponseData {
    idToken:string;
    email:string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}