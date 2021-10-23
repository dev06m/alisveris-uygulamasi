import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [TranslateService]
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedItem: number = 0;
  recipes: Recipe[] = []; 
  isRecipeSelected: boolean = true;
  
  title = "Select a Recipe";

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, 
              public translate: TranslateService
            ) { }

  ngOnInit(): void {
    this.recipeService.recipes$.subscribe((recipeArr => this.recipes =  recipeArr));
    this.changeTitle();
  }

  selected() {
    this.isRecipeSelected = false;
    // this.route.paramMap.subscribe(params => {
    //   this.selectedItem = +params.get('id')
    // }
    // )
    // this.recipeService.selectedItemNumber(this.selectedItem);
  }
  
  changeTitle(){
    this.route.url.subscribe(urlSegment => {
      console.log(urlSegment)
      if (urlSegment.length === 0) {

      }
    })
  }

  ngOnDestroy() {
    // console.log('destroyed')
  }


}
