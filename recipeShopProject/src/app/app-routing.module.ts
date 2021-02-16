import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
const appRoutes: Routes = [
    {path: '',redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)}
    //{path: 'not-found', component:NotFoundComponent},
    //{path: '**', redirectTo:'/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}