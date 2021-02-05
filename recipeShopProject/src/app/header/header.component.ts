import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-header', //header = html element
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    @Output() featureSelected = new EventEmitter<String>();
    onSelect(feature: string) { 
        this.featureSelected.emit(feature);
    }

}