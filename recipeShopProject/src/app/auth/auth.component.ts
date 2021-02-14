import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
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
    if(!this.loginForm.valid){ // for security measures if someone go's into console
      return;
    }
    this.isLoading  = true;
    if(this.isLoginMode){

    }else{
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.pass;
      this.authService.signUp(email,password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        }, error => {
          console.log(error);
          this.isLoading = false;
        }
      )
    }
    this.loginForm.reset();
  }

}
