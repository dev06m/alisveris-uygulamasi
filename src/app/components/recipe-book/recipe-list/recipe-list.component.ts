import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service'
import { Recipe } from 'src/app/common/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  params;
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeArr.subscribe(recipes => {
      this.recipes = recipes;
    })
    this.route.paramMap.subscribe(params => {
      this.params = params
      console.log(this.recipes)
    })
  }

  recipeSelected() {
    console.log()
  }

}
