import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private http:HttpClient, private recipesService:RecipeService){}
    storeRecipes(){
        require('dotenv').config();
        const recipes = this.recipesService.getRecipes();
        //changes all recipes
        this.http.put(process.env.APIURL + 'recipes.json',recipes).subscribe(response => console.log(response));
    }

    fetchRecipes(){
        require('dotenv').config();
        return this.http.get<Recipe[]>(process.env.APIURL + 'recipes.json')
        .pipe(map(recipes => { //rxjs map 
            return recipes.map( //javascript map
                recipe => {return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            }) 
        }), 
        tap(recipes => {
            this.recipesService.setRecipes(recipes);
        })
        )
    }
}