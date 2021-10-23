import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service'
import { Recipe } from 'src/app/common/recipe.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  selectedItem: number = 0;
  recipes: Recipe[] = []; 
  // isRecipeSelected: boolean = false;
  isRecipesEmpty = false;

  constructor(public recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe()//recipes => console.log(recipes));
    this.recipeService.recipes$.subscribe(recipes => {
      this.recipes = recipes
      if (this.recipes.length === 0) {
        this.isRecipesEmpty = true;
      }
    });
  }

  // selected() {
  //   this.isRecipeSelected = true;
  //   this.route.paramMap.subscribe(params => {
  //     this.selectedItem = +params.get('id')
  //   }
  //   )
  //   console.log(this.selectedItem)
  //   // this.recipeService.selectedItemNumber(this.selectedItem);
  // }


}
