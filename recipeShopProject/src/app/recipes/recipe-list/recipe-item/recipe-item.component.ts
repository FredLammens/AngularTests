import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [
  ]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: { name: string, description: string, imgPath: string };
  constructor(private recipeService:RecipeService) { }
  ngOnInit(): void {
  }
  onSelected() { 
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
