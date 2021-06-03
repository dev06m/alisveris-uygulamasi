import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./components/recipe-book/recipe-book.component";
import { RecipeDetailComponent } from "./components/recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./components/recipe-book/recipe-edit/recipe-edit.component";
import { RecipeListComponent } from "./components/recipe-book/recipe-list/recipe-list.component";
import { ShoppingEditComponent } from "./components/shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const routes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipeBookComponent, children: [
        {path: 'save', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: 'edit/:id', component: RecipeEditComponent},
    ]},
    {path: 'shoppinglist', component: ShoppingListComponent, children: [
        {path: ':id', component: ShoppingListComponent},
    ]},
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],    
    exports: [RouterModule]
})
export class RoutesModule { }