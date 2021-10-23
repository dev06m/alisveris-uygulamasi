import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/common/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  @ViewChild('signForm') slForm: NgForm;

  isEditing: boolean = false;
  index: number;

  name = null;
  amount = null;
  subscription: Subscription;

  // react form
  signForm: FormGroup;
  constructor(private slService: ShoppingListService,
              private route: ActivatedRoute,
              public translate: TranslateService) { 
                translate.setDefaultLang('en');
              }

  ngOnInit(): void {
    this.signForm = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'amount': new FormControl(this.amount, [Validators.required, Validators.maxLength(2)]),
      //'hobbies': new FormArray([])
    });

      // to edit selected ongredient
    this.subscription = this.slService.selectedIndex.subscribe(index => {
      this.isEditing = true;
      this.index = index; 
      let ingredient = this.slService.getSingleIngredient(index)
      this.name = ingredient.name
      this.amount = ingredient.amount
      // set new form properties
      this.signForm.patchValue({
        name: this.name,
        amount: this.amount
      })
    })

    
  }
  
  onSubmit() {
    let ingredient = new Ingredient(this.signForm.value.name, this.signForm.value.amount)
    if (this.isEditing){
      this.slService.updateIngredient(this.index, this.signForm.value.name, this.signForm.value.amount)
      this.isEditing = false;
    }else {
      this.slService.addNewIngredient(ingredient);
    }
    this.signForm.reset();
  }

  onCancel() {
    this.signForm.reset();
    this.isEditing = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.index);
    this.isEditing = false;
    this.signForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
