import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{
  username:string = "fred";
  isValidUsername(){
    if(this.username == "")
    return true;
    else
    return false;
  }
  resetUsername(){
    this.username = "";
  }
}
