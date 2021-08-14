import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PreventUnasavedChangesGuard } from './_guards/prevent-unasaved-changes.guard';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: 'save', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: 'edit/:id', component: RecipeEditComponent}//, canDeactivate: [PreventUnasavedChangesGuard]},
  ]},
  {path: 'shoppinglist', component: ShoppingListComponent, children: [
      {path: ':id', component: ShoppingListComponent},
  ]},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
