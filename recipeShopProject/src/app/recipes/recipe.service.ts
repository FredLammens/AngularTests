import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    //---------------------------------------------------------------------------------------------------------------------------------------
    constructor(private slService:ShoppingListService) {}
    //---------------------------------------------------------------------------------------------------------------------------------------
    private recipes: Recipe[] = [
        new Recipe("BIO nutella!","nut based spread","https://static.openfoodfacts.org/images/products/356/007/047/2888/front_fr.69.full.jpg", [new Ingredient("hazelnut",5), new Ingredient("cashew",10)]),
        new Recipe("Hamburger","tasty beef wrapped in buns","https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Big_Mac_hamburger.jpg/694px-Big_Mac_hamburger.jpg",
         [
             new Ingredient("beef patty",1),
             new Ingredient("buns",2),
             new Ingredient("salad",1)
        ])
    ];
    getRecipes(){
          return this.recipes.slice(); //returns new array that is copy of 
    }
    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    getRecipe(id:number){
        return this.recipes[id];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}