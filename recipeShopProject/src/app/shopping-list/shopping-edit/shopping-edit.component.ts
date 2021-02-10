import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
    `
    input.ng-invalid.ng-touched {
      border: 1px solid red;
    }
    `  
  ]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm: FormGroup;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingEditForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required,Validators.pattern('^[1-9]+[0-9]*$')]) //allow only numbers > 0
    });
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingEditForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  ngOnDestroy(){
    this.editSubscription.unsubscribe();
  }
  onSubmit(){
    const name = this.shoppingEditForm.get('name').value;
    const amount = +this.shoppingEditForm.get('amount').value;
    const newIngredient = new Ingredient(name,amount)
    if(this.editMode)
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
    else
    this.shoppingListService.addIngredient(newIngredient);

    this.shoppingEditForm.reset();
    this.editMode = false;
  }
  onClear(){
    this.shoppingEditForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
