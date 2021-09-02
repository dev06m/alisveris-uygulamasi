import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShadowDirective } from './common/shadow.directive';
import { ShortenName } from './common/shorten-name.pipe';
import { PipesComponent } from './pipes_example/pipes/pipes.component';
import { PipePipe } from './pipes_example/pipe.pipe'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExpInterceptorService } from './_interceptors/exp.interceptor';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    ShadowDirective,
    ShortenName,
    PipesComponent,
    PipePipe,
    AuthComponent,
    LoadingSpinner
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      // {provide: HTTP_INTERCEPTORS, useClass: ExpInterceptorService, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
