import { AfterViewInit, Component, ElementRef, NgModule, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/app/common/recipe.model';
import { RecipeService } from '../recipe.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, AfterViewInit {
  // @ViewChild('ingredientsDiv') ingredientsDiv; 
  // @ViewChild('ingredientDiv') ingredientDiv; 
  // @ViewChild('div') divv;
  // @ViewChild('form') form: NgForm; 
  isEdit: boolean = false;
  recipeIndex = this.route.snapshot.params.id;
  model: any;
  
  @ViewChild('ingredients') private ingredients: ElementRef;
  @ViewChild('ingredientFormGroup') ingredientFormGroup: ElementRef;


  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }


  ngAfterViewInit(): void { // bu life cycle hook view ile view initilalize edilmis oluyo viewchild burda kullanilabilir ornegin   

  }

  ngOnInit(): void {
    this.initializationForm();
    this.route.params.pipe(
      map(params => {
        console.log(params['id'])
        return +params['id'];
      })
      ).subscribe(id => {
        if (id != undefined)  {
          console.log('edit')
          this.populateForm(id);
          this.isEdit = true;
        }
      })
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
      console.log('control: ', control)
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
    let recipe = this.recipeService.getRecipe(index);
    if(recipe.ingredients.length > 0) {
      for(let ingredient of recipe.ingredients) {
        this.addIngredient();
      }
    }
    this.model.patchValue(recipe);
  }

  onSubmit() {
    // const recipes = this.recipeService.getRecipes();
    const model: Recipe = this.model.value;
    // const recipe = new Recipe(recipes.length+1, model.name, model.description, model.imagePath, model.ingredients)
    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipeIndex, model)
      this.isEdit = false;
    } else {
      // this.recipeService.saveRecipe(model);
      console.log('model: ', model)
      this.recipeService.saveRecipe(model).subscribe(res => {
        console.log(res)
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
