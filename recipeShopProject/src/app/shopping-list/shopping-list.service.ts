import { EventEmitter, Injectable, Output } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("hazelnut",5),
        new Ingredient("cashew",10),
        new Ingredient("milkpowder",20)
    ];
    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(index:number){
        return this.ingredients[index];
    }
    addIngredient(ingredient:Ingredient){
        let isInIngredients = false;
        let ingredientIndex:number;
        this.ingredients.forEach((listIngredient,index) => {
            if(listIngredient.name == ingredient.name){
                isInIngredients = true;
                ingredientIndex = index;
            }
        });
        if(isInIngredients)
        this.ingredients[ingredientIndex].amount += ingredient.amount; 
        else
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}