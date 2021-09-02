import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { AuthComponent } from './auth/auth.component';
import { RecipeResolver } from './common/recipe-resolver.service';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PipesComponent } from './pipes_example/pipes/pipes.component';
import { PreventUnasavedChangesGuard } from './_guards/prevent-unasaved-changes.guard';

const routes: Routes = [
  // {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: '', component: AuthComponent, pathMatch: 'full'},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'recipes', component: RecipesComponent, children: [
        {path: 'save', component: RecipeEditComponent},
          {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
          {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolver]}//, canDeactivate: [PreventUnasavedChangesGuard]},
      ]},
      {path: 'shoppinglist', component: ShoppingListComponent, children: [
          {path: ':id', component: ShoppingListComponent},
      ]},
      {path: 'pipes', component: PipesComponent},
    ]
  },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
