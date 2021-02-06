import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input('appBetterHighlight') defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';
  //without renderer
  @HostBinding('style.backgroundColor') backgroundColorProperty: string ;

  constructor(private element: ElementRef) { }
  ngOnInit(){
    this.backgroundColorProperty =this.defaultColor; //else default = for split second transparent
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColorProperty = this.highlightColor;
  } 
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColorProperty = this.defaultColor;
  } 
}
