import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth-guard.guard";
import { AuthGuardService } from "src/app/common/services/auth-guard.service";
import { RecipeResolver } from "src/app/common/services/recipe-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
// import { RecipeModule } from "./recipe.module";
import { RecipesComponent } from "./recipes.component";


const routes: Routes = [
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        component: RecipesComponent,
        children: [
            {path: 'save', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
            {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolver]}//, canDeactivate: [PreventUnasavedChangesGuard]},
            ],
        // canLoad: [AuthGuardService]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        // RecipeModule
    ],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }