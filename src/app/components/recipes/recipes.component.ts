import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedItem: number = 0;
  recipes: Recipe[] = []; 
  isRecipeSelected: boolean = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeArr.subscribe((recipeArr => this.recipes =  recipeArr));
    this.route.paramMap.subscribe(params => {
    })
  }

  selected() {
    this.isRecipeSelected = true;
    this.route.paramMap.subscribe(params => {
      this.selectedItem = +params.get('id')
    }
    )
    this.recipeService.selectedItemNumber(this.selectedItem);
  }

  addNewecipe() {
    
  }

}
