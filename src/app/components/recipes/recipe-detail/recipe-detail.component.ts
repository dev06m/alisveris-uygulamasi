import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/common/ingredient.model';
import { Recipe } from 'src/app/common/recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Params } from '@angular/router';
import { SharedService } from '../shared.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
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

  onDelete(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigateByUrl('/recipes'); // or navigate['...']
  }

  ngAfterViewInit(): void {
    console.log('view changed')
    // this.scrollSelectedEl();
  }


  // scrollSelectedEl() {
  //   $(this.a.nativeElement).on('click', function(e) {
  //     // prevent default anchor click behavior
  //     e.preventDefault();
      
  //     console.log('element changed')
  
  //   });
  // }

}

