import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(private http:HttpClient, private recipesService:RecipeService, private authService: AuthService){}
    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        //changes all recipes
        this.http.put( environment.apiUrl + 'recipes.json',recipes).subscribe(response => console.log(response));
    }

    fetchRecipes(){
            return this.http.get<Recipe[]>( environment.apiUrl + 'recipes.json')
            .pipe(
                map(recipes => { //rxjs map 
                return recipes.map( //javascript map
                    recipe => {return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                }) 
            }), 
            tap(recipes => {
                this.recipesService.setRecipes(recipes);
            }));
       
    }
}