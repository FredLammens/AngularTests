import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  //@HostBinding('class') classes: string;
  /*
  @HostListener('click') dropdown(eventData:Event){
    if(this.classes === "open")
    this.classes = "closed";
    else
    this.classes = "open";
  }*/
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
