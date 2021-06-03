import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  
  selectedItem: number = 0;

  recipes: Recipe[] = []; 

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.route.paramMap.subscribe(params => {
      //console.log(params)
    })
    console.log(this.route.snapshot.params)
  }

  selected() {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      this.selectedItem = +params.get('id')
    }
    )
    console.log(this.selectedItem)
    this.recipeService.selectedItemNumber(this.selectedItem);
  }

}
