import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, of, Subject } from "rxjs";
import { Ingredient } from "src/app/common/ingredient.model";
import { Recipe } from "src/app/common/recipe.model";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AccountService } from "src/app/auth/account.service";
import { User } from "src/app/auth/user.model";

@Injectable({
    providedIn: 'root'
})
export class RecipeService{
  baseUrl = 'https://ng-course-recipe-book-d3d1d-default-rtdb.firebaseio.com/recipes.json';
  selectedRecipe = new Subject<Recipe>();
  selectedItem: number;
  isRecipeSelected = new EventEmitter<boolean>();

  recipesResource = new Subject<Recipe[]>();
  recipes$ = this.recipesResource.asObservable();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient, private accountService: AccountService) {
  }


  recipeArr = new BehaviorSubject<Recipe[]>(this.recipes);


  getRecipes() {
    
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      map(res => {
        let recipeArray = []
        for (const key in res) {
            recipeArray.push({ ...res[key] })
        }
        const recipes: Recipe[] = []
        recipeArray.map(recipe => {
          recipes.push({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []});
        })
        this.recipes = recipes;
        this.recipesResource.next(recipes);
        
        return recipes; 
        }))
  } 

  getRecipe(index: number) {
    return this.recipes[index];
  }

  selectedItemNumber(item : number) {
    this.selectedItem = item;
    this.isRecipeSelected.emit(true);
    this.selectedRecipe.next(this.recipes[this.selectedItem]);
  }

  saveRecipe(recipe: Recipe) {
    if (recipe.ingredients.length < 1) {
      recipe.ingredients = [];
    }
    this.recipes.push(recipe);
    this.recipesResource.next(this.recipes);
    return this.http.post<Recipe>(this.baseUrl, recipe);
  }
  
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.http.put(this.baseUrl, this.recipes).subscribe(res => {
      this.recipesResource.next(this.recipes);
    });
    // this.http.put(this.baseUrl, );
  }

  deleteRecipe(id: number) {
    this.recipes.splice(this.recipes.findIndex(r => r.id === id), 1);
    this.recipeArr.next(this.recipes.slice());
  }
  
}