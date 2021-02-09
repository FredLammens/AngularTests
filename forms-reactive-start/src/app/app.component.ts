import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
        'email' : new FormControl(null, [Validators.required,Validators.email],[this.forbiddenEmails])
      }),
      'gender' : new FormControl('male') ,
      'hobbies' : new FormArray([])
    }); 
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
      ); //statusChanges => returns valid/pending/invalid  |  valueschanges => returns form object 
      this.signupForm.patchValue(
        {
          'userData': {
            'username': 'Fre'
          }
        }
      );
  }
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
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
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{ //also bind this if u use it
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com')
        resolve({'emailIsForbidden': true});
        else
        resolve(null);12
      },1500);
    });
    return promise;
  }
}
