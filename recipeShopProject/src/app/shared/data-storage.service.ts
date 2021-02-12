import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {map} from "rxjs/operators";

const APIURL = ;
@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private http:HttpClient, private recipesService:RecipeService){}
    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        //changes all recipes
        this.http.put(APIURL + 'recipes.json',recipes).subscribe(response => console.log(response));
    }
    fetchRecipes(){

        this.http.get<Recipe[]>(APIURL + 'recipes.json')
        .pipe(map(recipes => { //rxjs map 
            return recipes.map( //javascript map
                recipe => {return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            }) 
        }))
        .subscribe(recipes => {
            this.recipesService.setRecipes(recipes);
        });
    }
}