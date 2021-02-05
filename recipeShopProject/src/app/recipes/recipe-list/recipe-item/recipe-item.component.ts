import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [
  ]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: { name: string, description: string, imgPath: string };
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }
  ngOnInit(): void {
  }
  onSelected() { 
    this.recipeSelected.emit();
  }

}
