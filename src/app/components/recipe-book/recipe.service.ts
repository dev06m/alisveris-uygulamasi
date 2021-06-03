import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Ingredient } from "src/app/common/ingredient.model";
import { Recipe } from "src/app/common/recipe.model";


@Injectable({
    providedIn: 'root'
})
export class RecipeService{

  selectedRecipe = new Subject<Recipe>();
  selectedItem: number;
  isRecipeSelected = new EventEmitter<boolean>();
  

  private recipes: Recipe[] = [
    new Recipe("Imam Bayildi", "Bez Getir Cafer getir getirme getir getirmegetir getirme getir getirmegetir getirme getir getirmegetir getirme getir getirme", "https://i.lezzet.com.tr/images-xxlarge-recipe/imam_bayildi-b9911d4c-b18e-491d-9fc8-092a96a8ec84.jpg",
    [
      new Ingredient("potato", 5),
      new Ingredient("limon", 6),
     ]),
    new Recipe("Pizza", "Guzel bir pizza may make your day, and just enjoy your meal dear frıend from Paris. ", "https://cdn.yemek.com/mnresize/940/940/uploads/2017/01/ev-usulu-pizza-yeni.jpg",
    [
      new Ingredient("onion", 5),
      new Ingredient("bread", 6),
     ]),
    new Recipe("Pizza", "Guzel bir pizza may make your day, and just enjoy your meal dear frıend from Paris. ", "https://cdn.yemek.com/mnresize/940/940/uploads/2017/01/ev-usulu-pizza-yeni.jpg",
    [
      new Ingredient("oil", 5),
      new Ingredient("tomatoes", 6),
     ],),
    new Recipe("Hunkarbegendi", "Hunkar begenmezse hepimizin agzina sicar, o yuzden dikkatli olalim arkadaslar!", "https://i4.hurimg.com/i/hurriyet/75/750x422/5ee1da3018c7732a206bfa8c.jpg", 
    [
      new Ingredient("cola", 5),
      new Ingredient("cake", 6),
     ],)
  ];

  recipeArr = new BehaviorSubject<Recipe[]>(this.recipes);


  getRecipes() {
      return this.recipes.slice(); // this would give you a copy of your array though it wont be a deep copy
                                  // so the objects still are the same anyways 
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index]
  }

  selectedItemNumber(item : number) {
    this.selectedItem = item;
    this.isRecipeSelected.emit(true);
    this.selectedRecipe.next(this.recipes[this.selectedItem]);
  }

  saveRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeArr.next(this.recipes);
  }
  
  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    return this.recipeArr.next(this.recipes);
  }
  
}