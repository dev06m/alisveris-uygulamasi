import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from '../recipe.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEdit: boolean;
  recipeIndex = this.route.snapshot.params.id;
  model: any;
  @ViewChild('image') image: ElementRef;
  imageUrl: string;
  
  @ViewChild('ingredients') private ingredients: ElementRef;
  @ViewChild('ingredientFormGroup') ingredientFormGroup: ElementRef;


  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
               }


  ngOnInit(): void {
    this.initializationForm();

    // set isEdit true or false
    this.route.url.subscribe(urlSegments => {
      const url = urlSegments[0].path;
      (url === 'edit') ? this.isEdit = true : this.isEdit = false;

      // populate form if we re on editing
      if (this.isEdit){
        const id = +urlSegments[1].path
        this.populateForm(id);
      }
    })
  }

  onCheckImage(event) {
    const imgUrl = this.image.nativeElement.value;
    
    this.imageUrl = imgUrl;
    this.http.get(imgUrl).pipe(
      debounceTime(500),
      catchError(error => of(error))
    ).subscribe(res => {
      
    },
      err => {
        
        if (err){
        }
      }
    )
  }

  initializationForm() {
    this.model = this.formBuilder.group({
      // id: [''],
      name: ['', [Validators.required]],
      imagePath: ['', [Validators.required]],
      description: [''],
      ingredients: this.formBuilder.array([])//([this.createIngredient()])
    })
  }

  matchValues(match: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.value[match].values ? null : {isMtching: true}
    }
  } 

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: ''
    })
  }

  // this func is used in html as well
  addIngredient() {
    let ingredients = this.model.get('ingredients') as FormArray;
    ingredients.push(this.createIngredient());
  }
  
  populateForm(index: number) {
    if (this.isEdit){
      let recipe = this.recipeService.getRecipe(index);
      if(recipe?.ingredients?.length > 0) {
        for(let ingredient of recipe.ingredients) {
          this.addIngredient();
        }
      }
      this.model.patchValue(recipe);
    }
  }

  onSubmit() {
    // const recipes = this.recipeService.getRecipes();
    const model: Recipe = this.model.value;
    
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipeIndex, model)
      this.isEdit = false;
    } else {
      // this.recipeService.saveRecipe(model);
      this.recipeService.saveRecipe(model).subscribe(res => {
        
      });
    }
    this.router.navigateByUrl('/recipes');
  }

  removeIngredient(index: number) {
    (<FormArray>this.model.controls.ingredients).removeAt(index);
  }

  cancelEdit() {
    this.router.navigateByUrl('/recipes');
  }

}
