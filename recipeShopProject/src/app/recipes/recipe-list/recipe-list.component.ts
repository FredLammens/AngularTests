import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("BIO nutella","nut based spread","https://static.openfoodfacts.org/images/products/356/007/047/2888/front_fr.69.full.jpg"),
    new Recipe("BIO nutella","nut based spread","https://static.openfoodfacts.org/images/products/356/007/047/2888/front_fr.69.full.jpg")
  ];

  @Output() RecipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe: Recipe) {
    this.RecipeWasSelected.emit(recipe);
  }

}
