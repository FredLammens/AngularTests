
import { Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
     selector: '[appBasicHighlight]' 
})
export class BasicHighlightDirective implements OnInit{
    constructor(private elementRef: ElementRef ){//gets access to element with elementRef
    }
    ngOnInit(){ //better than constructor 
        this.elementRef.nativeElement.style.backgroundColor = 'green'; //not a good practicee!!
    }
}