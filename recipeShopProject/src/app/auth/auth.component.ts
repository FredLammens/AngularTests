import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error:string= null;
  loginForm: FormGroup;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  constructor(private authService:AuthService) {} 

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'pass' : new FormControl(null, [Validators.required, Validators.minLength(6)]) //minlength 6 for firebase
    });
  }
  onSubmit(){
    if(!this.loginForm.valid){ // for security measures if someone goes into console
      return;
    }
    this.isLoading  = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.pass;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.signIn(email,password);
    }else{
      authObs = this.authService.signUp(email,password);
    }
    
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }

}
