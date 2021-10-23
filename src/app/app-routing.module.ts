import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from './common/services/auth-guard.service';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { RecipeResolver } from './common/services/recipe-resolver.service';
import { HeaderComponent } from './components/header/header.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PipesComponent } from './pipes_example/pipes/pipes.component';
import { PreventUnasavedChangesGuard } from './_guards/prevent-unasaved-changes.guard';

// const routes: Routes = [
//   // {path: '', redirectTo: '/recipes', pathMatch: 'full'},
//   {path: '', component: AuthComponent, pathMatch: 'full'},
//   {
//     path: '',
//     runGuardsAndResolvers: 'always',
//     canActivate: [AuthGuard],
//     children: [
//       {path: 'recipes', component: RecipesComponent, children: [
//         {path: 'save', component: RecipeEditComponent},
//           {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolver]},
//           {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolver]}//, canDeactivate: [PreventUnasavedChangesGuard]},
//       ]},
//       {path: 'shopping-list', component: ShoppingListComponent, children: [
//           {path: ':id', component: ShoppingListComponent},
//       ]},
//       {path: 'pipes', component: PipesComponent},
//     ]
//   },
// ]

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    pathMatch: 'full', // bunu eklemeyince calismadi
    // loadChildren: './auth/auth.module#AuthModule'
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  }, 
  { path: 'recipes', 
    // loadChildren: './components/recipes/recipe-routing.module#RecipeRoutingModule',
    loadChildren: () => import('./components/recipes/recipe.module').then(m => m.RecipeModule),
    // canLoad: [AuthGuardService]
  },
  {
    path: 'shopping-list',
    // loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule'
    pathMatch: 'full', // bunu eklemeyince calismadi
    loadChildren: () => import('./components/shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
    canLoad: [AuthGuardService]
  },
  { path: 'pipes', 
    // loadChildren: './pipes_example/pipes.module#PipesModule'
    loadChildren: () => import('./pipes_example/pipes.module').then(m => m.PipesModule),
    // canLoad: [AuthGuardService] // eger request unauhtenticated ise iligili component'in yuklenmemesini saglar.
  },
  { path: '**', 
  // loadChildren: './pipes_example/pipes.module#PipesModule'
  // loadChildren: () => import('./pipes_example/pipes.module').then(m => m.PipesModule),
  component: NotFoundComponent
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
