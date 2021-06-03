import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/common/ingredient.model';
import { Recipe } from 'src/app/common/recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnChanges {

  isRecipeSelected: boolean = true;
  selectedRecipe: Recipe;
  recipeIndex: number;
  ingredientIndex: number;

  constructor(private recipeService: RecipeService, 
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }
              
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }


  ngOnInit(): void {
    // listen id changes in the route
    this.route.paramMap.subscribe((params: Params) => {
      this.recipeIndex = +params.get('id')
      
      // get current recipe
      this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
    })
    this.recipeService.isRecipeSelected.subscribe(
      res => this.isRecipeSelected = res
    )
  }

  addIngredientsToShoppingList() {
    this.selectedRecipe.ingredients.forEach(ingredient => {
      this.slService.addNewIngredient(ingredient)
    })
  }
  
  onEdit() {
    this.route.params.subscribe(params => {
      console.log("parmas :", params.id)
      this.router.navigateByUrl("/recipes/edit/" + this.recipeIndex);
    })

  }

}
function params(params: any, arg1: (Params: any) => void) {
  throw new Error('Function not implemented.');
}

