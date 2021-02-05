import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  display = false;
  clicks = [];
  constructor() { }
  togleDisplay(){
    this.clicks.push(this.display);
    this.display = !this.display;
  }
  ngOnInit(): void {
  }
  getStyle(){
    if(this.clicks.length >= 5)
    return "blue";
  }

}
