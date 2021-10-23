import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from '../recipe.service';
import { map } from 'rxjs/operators';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  providers: [ShoppingListService]
})
export class RecipeDetailComponent implements OnInit, AfterViewInit{

  //@Input() isRecipeSelected: boolean = true;
  recipe: Recipe;
  recipeIndex: number;
  isRecipeSelected: boolean = false;
  @ViewChild('a') a: ElementRef;

  constructor(private recipeService: RecipeService, 
              private slService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) 
              { }

  ngOnInit(): void {
    this.getRecipe();
  }

  addIngredientsToShoppingList() {
    for(let ingredient of this.recipe.ingredients) {
      this.slService.addNewIngredient(ingredient)
    }
  }

  getRecipe() {
    // listen id changes in the route
    this.route.params.pipe(
      map(params => {
        // this.recipeIndex = +params['id'];
        return +params['id'];
      })
    ).subscribe(id => {
      if (id !== undefined) {
        this.isRecipeSelected = true;
      }
      this.recipeIndex = id;
      this.recipe = this.recipeService.getRecipe(id);
    })
  }
  
  onEdit() {
    this.router.navigateByUrl('recipes/edit/' + this.recipeIndex);
    // this.route.params.subscribe(params => {
    //   this.router.navigateByUrl("/recipes/edit/" + this.recipeIndex);
    // })

  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigateByUrl('/recipes'); // or navigate['...']
  }

  ngAfterViewInit(): void {
    // this.scrollSelectedEl();
  }

}

