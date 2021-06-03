import { Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  @ViewChild('newIngredient') addNewIngredient: ElementRef; 
  @ViewChild('ingredients') ingredientsDev: ElementRef; 
  recipe: Recipe = new Recipe('', '', '', []);
  isEdit: boolean = false;
  recipeIndex = this.route.snapshot.params.id;

  newIngredient = ` <div class="row" #ingredients style="padding-top: 5px;">
  <div class="col-xs-12" #newIngredient>
      <div class="row">
          <div class="col-xs-8">
              <input 
                  type="text"
                  class="form-control">
          </div>
          <div class="col-xs-2">
              <input 
                  type="text"
                  class="form-control">
          </div>
          <button type="button" class="btn btn-danger" (click)="removeIngredient()">X</button>
      </div>
  </div>
</div>`;

  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    
    if (this.recipeIndex) {
      this.isEdit = true;
      let edittedRecipe = this.recipeService.getRecipe(this.recipeIndex) ;
      this.recipe.name = edittedRecipe.name;
      this.recipe.imagePath = edittedRecipe.imagePath;
      this.recipe.description = edittedRecipe.description;
      //this.recipe.name = edittedRecipe.name;
    }
    
  }

  onSubmit(form) {
    form = form.value;
    let newIngredient = new Recipe(form.name, form.description, form.imagePath, []);
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipeIndex, newIngredient)
      this.isEdit = false;
      console.log(newIngredient)
    } else {
      this.recipeService.saveRecipe(newIngredient);
      console.log("hayir burda")
    }
    
    this.router.navigateByUrl('/recipes');
  }

  removeIngredient() {
    this.addNewIngredient.nativeElement.remove();
  }

  addIngredient() {
    
    this.ingredientsDev.nativeElement.insertAdjacentHTML('beforeend', this.newIngredient);
  }

  ngAfterViewInit(){

    console.log("yess queen");

  }

}
