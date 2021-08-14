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
  isRecipeSelected: boolean = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeArr.subscribe(recipeArr => {
      this.recipes =  recipeArr;
    });
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


}