import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Recipe } from 'src/app/common/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  params;
  @Input() recipe: Recipe;
  @Input() recipeIndex: number;
  

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
  }

  recipeSelected() {
    let id = this.route
  }

}
