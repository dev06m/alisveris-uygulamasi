import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from '../../recipe.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  params;
  @Input() recipe: Recipe;
  @Input() recipeIndex: number;

  constructor(private recipeService: RecipeService,
              private sharedService: SharedService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeArr.subscribe(recipes => {
      // this.recipes = recipes;
    })
  }

  recipeSelected() {
    let id = this.route
    this.sharedService.emitChange(this.recipe);
    // this.sharedService.changeIndex$();
  }

}
