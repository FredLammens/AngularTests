import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeSelectComponent } from "./recipes/recipe-select/recipe-select.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipesResolverService } from "./recipes/recipes.resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const appRoutes: Routes = [
    {path: '',redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component:RecipesComponent, children: [
        {path: '',component:RecipeSelectComponent},
        {path: 'new',component:RecipeEditComponent},
        {path: ':id',component:RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit',component:RecipeEditComponent,  resolve: [RecipesResolverService]}
    ]},
    {path: 'shopping-list',component:ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
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