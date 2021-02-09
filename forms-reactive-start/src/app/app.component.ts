import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris','Anna'];

  ngOnInit() {
    //lifecyclehook before template is rendered
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username':  new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required,Validators.email])
      }),
      'gender' : new FormControl('male') ,
      'hobbies' : new FormArray([])
    }); 
  }
  onSubmit(){
    console.log(this.signupForm);
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean}{ //returns javascript object with key value pair with key that is a string 
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) //javascript this is not from this obejct but from form control so error!
    return {'nameIsForbidden': true}; //errorcode = true
    return null; //if validation is succesfull
  }
}
