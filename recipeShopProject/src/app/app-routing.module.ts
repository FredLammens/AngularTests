import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeSelectComponent } from "./recipes/recipe-select/recipe-select.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoutes: Routes = [
    {path: '',redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component:RecipesComponent, children: [
        {path: '',component:RecipeSelectComponent},
        {path: ':id',component:RecipeDetailComponent}
    ]},
    {path: 'shopping-list',component:ShoppingListComponent},
    {path: 'not-found', component:NotFoundComponent},
    {path: '**', redirectTo:'/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}