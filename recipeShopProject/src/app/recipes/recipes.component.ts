import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: [
  ],
  providers:[RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  
  constructor(recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
