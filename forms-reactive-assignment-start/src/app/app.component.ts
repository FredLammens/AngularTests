import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  projectForm: FormGroup;
  statuses = ['Stable', 'Critical', 'Finished'];
  ngOnInit(){
    this.projectForm = new FormGroup({
      'projectname': new FormControl(null,[Validators.required, CustomValidators.mustContainTestValidator]),
      'email' : new FormControl(null, [Validators.required, Validators.email], CustomValidators.mustContainTestAsyncValidator),
      'status' : new FormControl('Critical')
    });
  }
  onSubmit(){
    console.log(this.projectForm);
  }
}
