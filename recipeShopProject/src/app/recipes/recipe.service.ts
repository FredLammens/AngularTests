import { EventEmitter, Injectable, Output } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
    //---------------------------------------------------------------------------------------------------------------------------------------
    @Output() recipeSelected = new EventEmitter<Recipe>();
    //---------------------------------------------------------------------------------------------------------------------------------------
    private recipes: Recipe[] = [
        new Recipe("BIO nutella!!!","nut based spread","https://static.openfoodfacts.org/images/products/356/007/047/2888/front_fr.69.full.jpg"),
        new Recipe("BIO nutella","nut based spread","https://static.openfoodfacts.org/images/products/356/007/047/2888/front_fr.69.full.jpg")
    ];
      getRecipes(){
          return this.recipes.slice(); //returns new array that is copy of 
    }
    }