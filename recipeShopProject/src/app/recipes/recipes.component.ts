import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: [
  ]
})
export class RecipesComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

}
